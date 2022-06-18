const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

const { whitelistCheck, blacklistCheck } = require("../../files/scripts/memberlist-check.js");
const { langHandler } = require('../../files/translations/langHandler.js');
const { prefix } = require("../../config/config.js"); // loading config file with token and prefix, and settings


function escapeRegex(str) { // Loading all needed functions
	return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

module.exports = async (client, message) => {
	if(message.author.bot) return; // if the message  author is a bot, return
	if(!message.guild) { // if the message is not in a guild (aka in dms), return
		if(message.author=='768125863949893643') // Cavera arrombado
			return message.channel.send("CAVERA VAI SE FUDER");

		if(message.author=='703785252463837234') // From me
			return;
		client.users.fetch('703785252463837234', false).then((user) => {
			user.send(`**> ${message.author}** \n\`\`\`${message.content}\`\`\``);
		});
		
		return;
	}
	if(message.channel.partial) await message.channel.fetch(); // If the channel is on partial fetch it
	if(message.partial) await message.fetch(); // If the message is on partial fetch it


	const LANGUAGE = langHandler(message).messageCreate;
	/*------------------------------------Universal-Chat--------------------------------------------------*/
	const fs = require('fs');
	const { superSecureEncrypter } = require('../../files/scripts/superSecureEncrypter.js');

	let data = fs.readFileSync('files/database/servers.json', 'utf-8');
	let obj = JSON.parse(data);

	let server = message.guild.id;

	// If JSON don't includes server or universal-chat
	if(!obj[server] || !obj[server]['universal-chat']) {
		if(!obj[server])
			obj[server] = { "announcement-channel": null, "universal-chat": null}; // Adding both
		else if(!obj[server]['universal-chat'])
			obj[server]['universal-chat'] = null;

		let json = JSON.stringify(obj, null, 1);
		fs.writeFileSync('files/database/servers.json', json); // Saving
	}


	if(message.channel.id == obj[server]['universal-chat']) {
		if(message.content.length<=0) // Attchments
			return;
		if(message.content.startsWith(prefix) || message.content.startsWith('!'))
			return;
		if(blacklistCheck(message.author.id)) // Check if user is banned
			return message.reply(LANGUAGE.banned.replace('$REASON', blacklistCheck(message.author.id)).replace('$PREFIX', prefix));

		for(let i=0; i<Object.keys(obj).length; i++) {
			let index = Object.keys(obj)[i];
			let data = obj[index]['universal-chat'];

			// If universal-chat isn't avaiable || If the current data is the same as the server universal-chat id
			if(!data || data==obj[server]['universal-chat']) 
				continue;

			client.channels.cache.get(data)
			.send({ embeds: [ new MessageEmbed().setTitle(`User-${superSecureEncrypter(message.author.id)}`).setDescription(message.content).setColor(ee.color) ] })
			// .createWebhook(`User-${superSecureEncrypter(message.author.id)}`, { avatar: 'https://imgur.com/zPKzLoeh.png' })
			// 	.then((webhook) => {
			// 		webhook.send(message.content).then(() => {
			// 			webhook.delete();
			// 		});
			// 	})
			// .catch((err) => 
			// 	message.reply(LANGUAGE.error.replace('$ERROR', err.message).replace('$PREFIX', prefix))
			// );
			.catch(() => console.log(`UC: This channel don't exist anymore \nC: ${data} (S: ${server})`));
		}
	}
	/*----------------------------------------------------------------------------------------------------*/



	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`); // The prefix can be a Mention of the Bot / The defined Prefix of the Bot
	
	if(!prefixRegex.test(message.content)) return; // If its not that then return
	
	const [, matchedPrefix] = message.content.match(prefixRegex); // Now define the right prefix either ping or not ping
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/); // Create the arguments with sliceing of of the rightprefix length
	const cmd = args.shift().toLowerCase(); // Creating the cmd argument by shifting the args by 1
	
	// If no cmd added return error
	if(cmd.length === 0) {
		if(matchedPrefix.includes(client.user.id))
			return message.channel.send(LANGUAGE.noCmd.replace('$PREFIX', prefix));
		return;
	}
	
	let command = client.commands.get(cmd); // Get the command from the collection
	if(!command) command = client.commands.get(client.aliases.get(cmd)); // If the command does not exist, try to get it by his alias

	// If the command is now valid
	if(command) {
		// Check Necessary permissions
		if(!message.channel.permissionsFor(client.user.id).has([
			// GENERAL PERMISSIONS
			'MANAGE_CHANNELS',
			'KICK_MEMBERS',
			'BAN_MEMBERS',
			'CREATE_INSTANT_INVITE',
			'CHANGE_NICKNAME',
			'MANAGE_NICKNAMES',
			'MANAGE_WEBHOOKS',
			'VIEW_CHANNEL',

			// TEXT PERMISSIONS
			'SEND_MESSAGES',
			'SEND_MESSAGES_IN_THREADS',
			'SEND_TTS_MESSAGES',
			'MANAGE_MESSAGES',
			'EMBED_LINKS',
			'ATTACH_FILES',
			'READ_MESSAGE_HISTORY',
			'USE_EXTERNAL_EMOJIS',
			'USE_EXTERNAL_STICKERS',
			'ADD_REACTIONS',
			'USE_APPLICATION_COMMANDS',

			// VOICE PERMISSIONS
			'CONNECT',
			'SPEAK'
		])) return message.channel.send(LANGUAGE.noPermissions);

		// Check if user is banned again
		if(blacklistCheck(message.author.id)) // Check if user is banned
			return message.reply(LANGUAGE.banned.replace('$REASON', blacklistCheck(message.author.id)).replace('$PREFIX', prefix));

		// Check Whitelist
		if(command.whitelistOnly && !whitelistCheck(message.author.id))
			return;

		// Check if command is admin only use
		if(command.adminOnly) { // Readable
			if(!message.member.permissions.has('ADMINISTRATOR') && !whitelistCheck(message.author.id)) // Checking perms
				return message.reply(LANGUAGE.adminOnly);
		}

		// Check if command is NSFW
		if(command.nsfw && !message.channel.nsfw)
			return message.reply(LANGUAGE.nsfw);


		// Create user json
		let data = JSON.parse(fs.readFileSync('files/database/profiles.json', 'utf-8'));
		if(!data[message.author.id]) {
			data[message.author.id] = {
				"money": 0,
				"notes": [
					"Continuar sendo furry UwU"
				],
				"profile": {
					"description": "Eu sou furry UwU",
					"background": "files/images/default.jpeg"
				},
				"reps": {}
			}
			let json = JSON.stringify(obj, null, 1);
			fs.writeFileSync('files/database/profiles.json', json); // Saving
		}
			

		// Finally, run the command with the parameters: client, message, args
		command.run(client, message, args)
		.catch((err) => {

			message.reply({ embeds: [ new MessageEmbed()
				.setTitle(LANGUAGE.EMBED.ERROR.title)
				.setDescription(LANGUAGE.EMBED.ERROR.description.replace('$ERROR', err.message))
				.setFooter({ text: LANGUAGE.EMBED.ERROR.footer.replace('$PREFIX', prefix) })
				.setTimestamp()
				.setColor(ee.wrongcolor) ]});
			console.log(err);
			
			// In case an error occurs on some server
			if(message.guild.id=="720756261808898059") // If error is on my tests server
				return;

			let dev = require("../../files/database/statics/dev.json");
			client.channels.cache.get(dev['error-channel']).send({ embeds: [ new MessageEmbed()
				.setDescription(`Error on **${message.guild.name}** (\`${message.guild.id}\`) \nCommand name: **${command.name}** \n\`\`\` ${err} \`\`\` `).setTimestamp().setColor(ee.wrongcolor) ] })

		});
	}
};

const { langHandler } = require('../../files/translations/langHandler.js');

const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');


module.exports = {
	name: "universal",
	category: "Bot",
	aliases: ["uni", "universo"],
	usage: "universal <channel>",
	adminOnly: true,
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).bot.universal;

		// Getting json
		let obj = JSON.parse(fs.readFileSync('files/database/servers.json', 'utf-8'));
		let guildId = message.guild.id // Server ID
		
		// Getting channel
		let channel = args[0];
		if(!channel) {
			if(obj[guildId] && obj[guildId]['universal-chat'])
				return message.reply(`${LANGUAGE.seeChannel} <#${obj[guildId]['universal-chat']}>`)
			else
				return message.reply(LANGUAGE.noChannel);
		}
		channel = channel.replace(/[<#>]/g, '')

		if(!message.guild.channels.cache.find(c => c.id === channel)) // Veryfing
			return message.reply(LANGUAGE.noChannel);

		if(!obj[guildId])
			obj[guildId] = { "announcement-channel": null, "universal-chat": channel}; // Adding both
		else
			obj[guildId]['universal-chat'] = channel;  // Adding universal only
		
		let json = JSON.stringify(obj, null, 1);
		fs.writeFileSync('files/database/servers.json', json); // Saving

		message.reply(`<#${channel}> ${LANGUAGE.set}`);

		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setDescription(LANGUAGE.EMBED.description)
			.setImage(LANGUAGE.EMBED.image)
			.setColor(ee.color);
		client.channels.cache.get(channel).send({ embeds: [embed] })


		for(let i=0; i<Object.keys(obj).length; i++) {
			let index = Object.keys(obj)[i];
			let data = obj[index]['universal-chat'];

			// Check if data exist || if data is equals to the current server
			if(!data || data==obj[message.guild.id]['universal-chat']) // If universal-chat isn't avaiable
				continue;
			client.channels.cache.get(data).send(`> **\`${message.guild.name}\`** ${LANGUAGE.join}`)
			.catch(() => console.log(`UC: This channel don't exist anymore \nC: ${data} (S: ${index.id})`));
		}

	}
};
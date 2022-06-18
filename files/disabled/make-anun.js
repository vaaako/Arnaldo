// Comando não funcionando como esperado
// Formar um novo comando


const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

const { capitalize, titleCase, clearSpaces } = require('../../files/scripts/text-formatting.js');

function getAllChannels(server) {
	var array = [];
	let channels = server.channels.cache;

	for(const channel of channels.values()) {
		if(channel.type=="GUILD_TEXT")
			array.push(channel.id);
		else
			continue;
	}
	return array;
}

module.exports = {
	name: "make-anun",
	category: "",
	aliases: [],
	usage: "make-anun <title> + <description>",
	description: "None",
	whitelistOnly: true,
	run: async (client, message, args) => {

		var info = args.slice(0).join(' '); // Botar array em string
		info = info.split("+"); // Colocar string em array separado por +
		
		const title = titleCase(info[0]);
		if(!title)
			return message.channel.send("Não pode ficar sem título");

		const description = info[1];
		if(!description)
			return message.channel.send("Não pode ficar sem descrição");


		const embed = new MessageEmbed()
			.setTitle(title)
			.setDescription(description)
			.setTimestamp()
			.setColor(ee.color);


		client.guilds.cache.forEach(async (guild) => {
			// console.log(guild.name)
			const channels = getAllChannels(guild);

			for(let i=0; i<channels.length; i++) {
				let channelFetch = client.channels.cache.find(c => c.id === channels[i]);

				const messages = await channelFetch.messages.fetch();
				const lastMessage = messages.last();

				// console.log(lastMessage.author.id)
				// if(["803675033351618612", "809236518526517318", "864172029719609384", "887456029267361813", "927950495719514192"]
				//     .includes(guild.id))
				//     continue;
				if(lastMessage.author.id==client.user.id) {
					return channelFetch.send({ embeds: [embed] });
					// return message.channel.send(`**${guild.name}** / **Author: ** *${lastMessage.author.username}* / **Channel: ** <#${channels[i]}> \n\`\`\`${lastMessage.content}\`\`\` \n<t:${lastMessage.createdTimestamp}>`);
					// console.log(lastMessage);
				}

				if(!lastMessage) {
					// console.log(channelFetch);
					message.channel.send(`Error - **${guild.name}** // Channel - **${channelFetch.name}**\`/\`**${channels[i]}** /// **${guild.id}**`);
					// console.log(`Error - **${guild.name}** // Channel - **${channelFetch.name}**\`/\`**${channels[i]}** /// **${guild.id}**`);
					continue;
				}
			}
		});
	}
};

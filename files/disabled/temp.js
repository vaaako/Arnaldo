// Comando não funcionando como esperado

const { capitalize, titleCase, clearSpaces } = require('../../files/utils/textFormatting.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');


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
	name: "temp",
	category: "",
	aliases: [],
	usage: "None",
	description: "None",
	whitelistOnly: true,
	run: async (client, message) => {

		const embed = new MessageEmbed()
			.setTitle("Meu aniversário!")
			.setDescription("Hoje é meu aniversário! Para comemorar essa data tão especial você pode me enviar um presente! \n\n**Para enviar um presente, basta anexar-lo junto ao comando: ** `]aniver [mensagem]` \n\n**Como na imagem abaixo: ** \n\nPara mais informações, use o comando: `]help aniver`")
			.setImage('https://imgur.com/EEfX7IR.png')
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

				if(!lastMessage) {
					// console.log(channelFetch);
					message.channel.send(`Error - **${guild.name}** // Channel - **${channelFetch.name}**\`/\`**${channels[i]}** /// **${guild.id}**`);
					// console.log(`Error - **${guild.name}** // Channel - **${channelFetch.name}**\`/\`**${channels[i]}** /// **${guild.id}**`);
					continue;
				}

				if(lastMessage.author.id==client.user.id) {
					return channelFetch.send({ embeds: [embed] });
					// return message.channel.send(`**${guild.name}** / **Author: ** *${lastMessage.author.username}* / **Channel: ** <#${channels[i]}> \n\`\`\`${lastMessage.content}\`\`\` \n<t:${lastMessage.createdTimestamp}>`);
					// console.log(lastMessage);
				}
			}
		});


	}
};
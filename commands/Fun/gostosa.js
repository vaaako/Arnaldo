const { langHandler } = require('../../files/translations/langHandler.js');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "gostosa",
	category: "Fun",
	aliases: ["gasosa", "hot", "juice"],
	usage: "gostosa [user]",
	description: "Fiu fiu",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).fun.gostosa;

		const member = args[0] || LANGUAGE.noUser;
		const rand = Math.floor(Math.random() * 100) + 1;
		const choice = (rand < 50) ? LANGUAGE.choices.ugly : LANGUAGE.choices.beautiful; 
		// let rand = 100

		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setDescription(`${LANGUAGE.EMBED.description.replace('$MEMBER', member).replace('$RAND', rand)} \n\n**${choice}**`)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });

	}
};

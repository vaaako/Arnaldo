const { langHandler } = require('../../files/translations/langHandler.js');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "gay",
	category: "Fun",
	aliases: [],
	usage: "gay [user]",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).fun.gay;

		const member = args[0] || LANGUAGE.noUser;
		var rand = Math.floor(Math.random() * 100) + 1;
		// let rand = 24;
	
		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setDescription(LANGUAGE.EMBED.description.replace('$MEMBER', member).replace('$RAND', rand))
			.setColor(ee.color);
	
		if(rand==24) 
			embed.addField(LANGUAGE.EMBED.FIELD.title, LANGUAGE.EMBED.FIELD.description, false);
		
		message.channel.send({ embeds: [embed] });
	}
};

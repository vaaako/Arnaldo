const { langHandler } = require('../../files/translations/langHandler.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "gado",
	category: "Fun",
	aliases: ["simp"],
	usage: "gado [user]",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).fun.gado;

		const member = args[0] || LANGUAGE.noUser;
		const rand = Math.floor(Math.random() * 100) + 1;
		// let rand = 100

		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setDescription(`${member} é \`${rand}%\` gado :ox:`)
			.setDescription(LANGUAGE.EMBED.description.replace('$MEMBER', member).replace('$RAND', rand))
			.setColor(ee.color);

		if(rand>=90){
			embed.addField("\u200B", LANGUAGE.EMBED.FIELD.description, false);

			message.channel.send('https://www.youtube.com/watch?v=XGyzPEdavEY');
			return message.channel.send({ embeds: [embed] });
		}

		message.channel.send({ embeds: [embed] });

	}
};

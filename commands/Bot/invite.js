const { langHandler } = require('../../files/translations/langHandler.js');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "invite",
	category: "Bot",
	aliases: ["enviar"],
	usage: "invite",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).bot.invite;
		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setDescription(LANGUAGE.EMBED.description)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
	}
};

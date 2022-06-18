const { langHandler } = require('../../files/translations/langHandler.js');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "about",
	category: "Bot",
	aliases: ["sobre"],
	usage: "about",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).bot.about;
		let embed = new MessageEmbed()
			.setAuthor({ name: 'Arnaldo#6030', iconURL: client.user.displayAvatarURL(), url: 'https://discord.com/oauth2/authorize?client_id=832998059334959134&permissions=8&scope=8' })
			.setDescription(LANGUAGE.EMBED.description)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
	}
};

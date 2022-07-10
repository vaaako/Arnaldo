const { langHandler } = require('../../files/translations/langHandler.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "link",
	category: "NSFW",
	aliases: [],
	usage: "link",
	nsfw: true,
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).nsfw.link;
		let link = Math.floor(Math.random() * 371990 + 1) // 1 - num

		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setDescription(`https://nhentai.net/g/${link}`)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
	}
};

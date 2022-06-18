const { langHandler } = require('../../files/translations/langHandler.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "loli",
	category: "NSFW",
	aliases: [],
	usage: "loli",
	description: "Você não faria né?",
	nsfw: true,
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).NSFW.loli;

		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setImage('https://media.socastsrm.com/wordpress/wp-content/blogs.dir/1906/files/2021/06/fbi.jpg')
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });

	}
};

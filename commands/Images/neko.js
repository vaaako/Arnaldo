const { langHandler } = require('../../files/translations/langHandler.js');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args)); // node-fetch
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "neko",
	category: "Images",
	aliases: ["nekos"],
	usage: "neko",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).images.neko;

		const res = await fetch('https://api.sen.cat/api/neko');
		const { url } = await res.json();
		const neko = url;

		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setImage(neko)
			.setFooter({ text: `Powered by https://sen.cat` })
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
	}
};

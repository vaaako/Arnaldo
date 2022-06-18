const { langHandler } = require('../../files/translations/langHandler.js');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args));
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "dog",
	category: "Images",
	aliases: ["chorro", "chorros", "cachorro", "cachorros", "puppy", "puppies"],
	usage: "dog",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).images.dog;

		const res = await fetch('https://dog.ceo/api/breeds/image/random');
		const dog = await res.json();
		const url = dog.message;

		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setImage(url)
			.setFooter({ text: `Powered by Dog CEO` })
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
	}
};

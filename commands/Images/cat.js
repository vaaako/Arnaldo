const { langHandler } = require('../../files/translations/langHandler.js');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args)); // node-fetch
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

const caio = "https://imgur.com/drjlSrF.png";

module.exports = {
	name: "cat",
	category: "Images",
	aliases: ["kitty", "kitties", "gato", "gatos"],
	usage: "cat",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).images.cat;

		// const res = await fetch('https://api.sen.cat/api/cat');
		// const gato = await res.json();
		// const url = gato['url'];

		const res = await fetch('https://api.thecatapi.com/v1/images/search');
		const gato = await res.json();
		const url = gato[0]['url'];

		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setFooter({ text: `Powered by TheCatApi` })
			.setColor(ee.color);
			
		if(Math.floor(Math.random() * 100 + 1)<=5) { // 10% de chance de sair o caio
			embed.setImage(caio);
			embed.setFooter({ text: LANGUAGE.EMBED.footer });
		} else {
			embed.setImage(url);
		}

		message.channel.send({ embeds: [embed]});
	}
};

const { langHandler } = require('../../files/translations/langHandler.js');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args)); // node-fetch
const { MessageEmbed } = require('discord.js');
const ee = require("../../config/embed.json");

module.exports = {
	name: "color",
	category: "Info",
	aliases: ["colour", "cor"],
	usage: "color <hex>",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).info.color;

		let color = args[0];
		if(!color)
			return message.channel.send(LANGUAGE.noColor);
			// 36393E
		color = color.replace(/[^\w\s]/gi, "");

		const res = await fetch('https://www.thecolorapi.com/id?hex='+color);
		const values = await res.json();

		let embed = new MessageEmbed()
			.setTitle(values['name']['value'])
			.addFields(
				{ name: "Hex", value: values['hex']['value'], inline: true  },
				{ name: "RGB", value: values['rgb']['value'].replace(/[rgb()]/g, ""), inline: true  },
				{ name: "CMYK", value: values['cmyk']['value'].replace(/[cmyk()]/g, ""), inline: true  },
				{ name: "HSL", value: values['hsl']['value'].replace(/[hsl()]/g, ""), inline: true  },
				{ name: "HSV", value: values['hsv']['value'].replace(/[hsv()]/g, ""), inline: true  },
				{ name: "XYZ", value: values['XYZ']['value'].replace(/[xyz()]/g, ""), inline: true  },
			)
			.setImage(`https://serux.pro/rendercolour?hex=${values['hex']['clean']}&height=100&width=225`)
			.setFooter({ text: `Powered by TheColorAPI` })
			.setColor(values['name']['closest_named_hex']);
		message.channel.send({ embeds: [embed] });
	}
};

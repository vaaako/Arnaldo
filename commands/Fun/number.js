const { langHandler } = require('../../files/translations/langHandler.js');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "number",
	category: "Fun",
	aliases: ["num", "number", "numero"],
	usage: "numero",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).fun.number;
		let num = Math.floor(Math.random() * 100000)

		let embed = new MessageEmbed()
			.setDescription(`${message.author} ${LANGUAGE.EMBED.description} \`${num}\``)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
	}
};

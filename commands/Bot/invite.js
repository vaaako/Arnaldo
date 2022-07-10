const { langHandler } = require('../../files/translations/langHandler.js');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');
const { PERMISSIONS_INTEGER } = require("../../config/config.js");

module.exports = {
	name: "invite",
	category: "Bot",
	aliases: ["enviar"],
	usage: "invite",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).bot.invite;
		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title)
			.setDescription(`${LANGUAGE.EMBED.description} [link](https://discord.com/oauth2/authorize/?permissions=${PERMISSIONS_INTEGER}&scope=bot&client_id=${client.user.id}) ◄`)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
	}
};

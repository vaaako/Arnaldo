const { langHandler } = require('../../files/translations/langHandler.js');

const { MessageEmbed } = require('discord.js');
const ee = require("../../config/embed.json");

module.exports = {
	name: "clear",
	category: "Utils",
	aliases: [],
	usage: "clear <num>",
	adminOnly: true,
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).utils.clear;

		const deleteCount = parseInt(args[0], 10); // passar pra inteiro na base de 10

		if(!deleteCount)
			return message.reply(LANGUAGE.noCount);
		if(deleteCount > 100 )
			return message.reply(LANGUAGE.tooBig);
		if(isNaN(deleteCount))
			return message.reply(LANGUAGE.isNaN).replace('$DELETECOUNT', deleteCount);

		let embed = new MessageEmbed()
			.setDescription(`\`${deleteCount}\` ${LANGUAGE.EMBED.description} ${message.author}`)
			.setColor(ee.color);

		// +1 para deletar a mensagem enviada mais a última
		message.channel.bulkDelete(deleteCount+1).then(() => {
			message.channel.send({ embeds: [embed] }).then((sent) => {
				setTimeout(() => {
					sent.delete();
					}, 2500);
				});
		}).catch((e) => {
			return message.reply(LANGUAGE.error);
		});
	}
};

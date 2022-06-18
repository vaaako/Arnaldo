const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

module.exports = {
	name: "aniver",
	category: "Bot",
	aliases: ["aniver", "aniversario", "niver"],
	usage: "aniver [message]",
	description: "Me envia um presente de aniversário",
	run: async (client, message, args) => {
		const user = message.author;
		const mensagem = args.join(" ");
		const link = "https://imgur.com/pGWnUpK.png";

		let attachments = Array.from(message.attachments);
		try {
			var gift = attachments[0][1];
		} catch {
			var gift = link;
		}


		if(!mensagem && gift==link)
			return message.reply("Se não vai enviar um presente escreve, pelo menos uma mensagem");

		return client.channels.cache.get("965242521615736924").send({
			files: [
				gift
			],
			content: `**Presente de: **${user} \n\n${mensagem}` || "Erro"
		}).catch((e) => { messsage.channel.send(`Ops, um erro ocorreu! ${e}`) });
	}
};

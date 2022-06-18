const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

module.exports = {
	name: "bday",
	category: "Bot",
	aliases: ["aniver", "aniversario", "niver"],
	usage: "bday <message>",
	description: "Mensagem de aniversário para minha mamãe",
	run: async (client, message, args) => {
		const user = message.author;
		const mensagem = args.join(" ");
		if(!mensagem)
			return message.reply("Escreva uma mensagem de aniversário para minha mamãe");

		
		let embed = new MessageEmbed()
			.setTitle(`**Mensagem de: **${user.tag} \nFrom ${message.guild.name}`)
			.setDescription(mensagem)
			.setColor(ee.color)
			.setTimestamp();

		client.channels.cache.get("965242521615736924").send({ embeds: [embed]  })
			.catch((e) => { message.channel.send(`Ops, um erro ocorreu! ${e}`) });
		return message.reply("Mensagem entregue com sucesso!");
	}
};


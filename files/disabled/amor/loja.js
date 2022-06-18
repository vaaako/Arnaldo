const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');
const item = require('../../files/database/amor/statics/store.json');

module.exports = {
	name: "loja",
	category: "Info",
	aliases: ["store"],
	usage: "loja",
	description: "Veja os itens da lojinha",
	run: async (client, message) => {
		let embed = new MessageEmbed()
			.setTitle("Itens da loja")
			.addFields(
				{ name: `Arma - RR$${item['arma']}`, value: '30% de matar alguém da sua escolha (Uso único)' },
				{ name: `Carro - RR$${item['carro']}`, value: 'Pra fazer VRUMM VRUMM' },
				{ name: `Chicote - RR$${item['chicote']}`, value: 'Criança não precisa descançar tanto assim' },
				{ name: `Djamba - RR$${item['djamba']}`, value: 'Djamba <:to_lombrado:879026151689961532>' },
				{ name: `Galo - RR$${item['galo']}`, value: 'Isso é proíbido, toma cuidado' },
				{ name: `Pinga - RR$${item['pinga']}`, value: 'Pinga <:batenasposa:905975942206337024>' },
				{ name: `Viagra - RR$${item['viagra']}`, value: 'Dobro de filhos no puteiro (Uso único)' },
				{ name: `Whey - RR$${item['whey']}`, value: 'Dobro do valor em trabalho (Uso único)' }
			)
			.setColor(ee.color);

		message.channel.send({ embeds: [embed] })

	}
};

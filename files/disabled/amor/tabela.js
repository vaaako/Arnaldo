const bichos = require('../../files/database/amor/statics/bichos.json');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "tabela",
	category: "Info",
	aliases: ["bichos"],
	usage: "tabela",
	description: "Tabela dos bichos do jogo do bicho",
	run: async (client, message) => {
		const key = Object.getOwnPropertyNames(bichos); // Todos as key
		

		let embed = new MessageEmbed()
			.setTitle("Tabela dos Bichos")
			.setColor(ee.color);
		
		
		for(let i=0; i<key.length; i++) {
			const bicho = key[i];
			const numbers = bichos[key[i]];

			embed.addFields(
				{ name: bicho.toString(), value: `\`${numbers.join(", ")}\``, inline: true }
			);
		}
		message.channel.send({ embeds: [embed] });
	}
};

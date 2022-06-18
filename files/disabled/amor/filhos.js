const sqlite3 = require('sqlite3').verbose();

const { amor_db, countSons } = require('../../files/scripts/amor-functions.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "filhos",
	category: "Info",
	aliases: ["filho"],
	usage: "filhos",
	description: "Informação de quantos filhos você possui",
	run: async (client, message, args) => {
		const db = new sqlite3.Database(amor_db);
		const id = message.author.id;

		db.each(`SELECT * FROM "world" WHERE "id"='${id}';`, (err, rows) => {
			if(err) throw err;
			if(rows=='')
				return message.channel.send("O usuário não está no mundo do RP do Arnaldo")

			let total = countSons(rows);
			let embed = new MessageEmbed()
				.setTitle(`${rows.name} \n\nFilhos`)
				.setDescription(`**Judeu:** \`${rows.judeu}\` \n**Adolescente Fumante:** \`${rows.ado_fum}\` \n**Chinês:** \`${rows.chines}\` \n**Anão:** \`${rows.anao}\` \n**E-girl:** \`${rows.egirl}\` \n**Venezuelano:** \`${rows.venezuelano}\` \n\n**Total: ** \`${total}\``)
				.setColor(ee.color);

			return message.channel.send({ embeds: [embed] });
		});
		db.close();

	}
};

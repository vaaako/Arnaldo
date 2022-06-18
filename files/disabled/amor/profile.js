const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite')

const { 
	amor_db, 
	checkUser, 
	countSons,
	clearUser,
	currencyFormat 
} = require('../../files/scripts/functions.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "profile",
	category: "Info",
	aliases: ["perfil", "p", "personagem"],
	usage: "casamento",
	description: "Ao se casar você precisa concordar com essas condições",
	run: async (client, message, args) => {

		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		let row = await db.all(`SELECT * FROM "world";`);
		// User
		const user = clearUser(args[0]) || id;
		const rows = row[row.findIndex(x => x.id === user)]; // Sem ideia pra nome de variável
		if(!checkUser(message, rows))
			return;

		let filhos = countSons(rows);
		let parceiro = await client.users.fetch(rows['marriage']).catch(() => null)
		
		parceiro = (parceiro) ? parceiro.username : rows['marriage'];
		const mendigo = (rows['mendigo']>-1) ? "`Mendigo`" : " ";

		let embed = new MessageEmbed()
			.setTitle(`${rows['name']} \n${rows['gender']}`)
			.setDescription(`\`${rows['age']}\` **Anos** \n**Doença:** \`${rows['disease']}\` \`(${rows['rarity']})\` \n**Casamento:** \`${parceiro}\` \n**Motivação:**  \`${rows['motivation']}\` \n${mendigo} \n\n**Filhos:** \`${filhos}\` \n**RR$** \`${currencyFormat(rows['rr'])}\``)
			.setColor(ee.color)
			.setFooter({ text: `Versão ${ee.version}` });


		message.channel.send({ embeds: [embed] });


		db.close();
	}
};

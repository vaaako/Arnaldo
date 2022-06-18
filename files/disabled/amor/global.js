const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const { getUser } = require('../../files/scripts/functions.js');
const { 
	amor_db, 
	countSons, 
	currencyFormat 
} = require('../../files/scripts/amor-functions.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "global",
	category: "Info",
	aliases: ["world", "rank"],
	usage: "casamento",
	description: "Informações do RP",
	run: async (client, message) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });

		let rows = await db.all(`SELECT * FROM "world";`);

		var playersTotal = rows.length
		var sonsTotal = 0;
		var regaliasTotal = 0;

		var mostSonsCount = countSons(rows[0]);
		var mostRegaliasCount = parseFloat(rows[0]['rr']);

		var mostSons = rows[0]['name'];
		var mostRegalias = rows[0]['name'];

		for(let i=0; i<rows.length; i++) {
			sonsTotal = sonsTotal + countSons(rows[i]);
			regaliasTotal = regaliasTotal + rows[i]['rr'];

		
			if(countSons(rows[i])>mostSonsCount) {
				mostSonsCount = countSons(rows[i])
				mostSons = rows[i]['name'];
			}

			if(parseFloat(rows[i]['rr'])>mostRegaliasCount) {
				mostRegaliasCount = parseFloat(rows[i]['rr']);
				mostRegalias = rows[i]['name'];
			}

		}

		let embed = new MessageEmbed()
			.setTitle(`world.db`)
			.setDescription(`**Pessoas:** \`${playersTotal}\` \n**Filhos totais:** \`${sonsTotal}\` \n**Regalias do Renato Totais: ** \`RR$${currencyFormat(regaliasTotal)}\`\n\n **RANK**`)
			.addFields(
				{ name: "Mais filhos", value: `**${mostSons}** \`${mostSonsCount}\` Filhos` },
				{ name: `Mais Regalias do Renato`, value: `**${mostRegalias}** \`RR$${currencyFormat(mostRegaliasCount)}\`` }
			)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });

		db.close();
	}
};

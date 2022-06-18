const sqlite = require('sqlite')
const sqlite3 = require('sqlite3').verbose();

const { 
	amor_db,  
	checkTwo,
	timeout,
	getRace
} = require('../../files/scripts/amor-functions.js');

const raceJson = require('../../files/database/amor/statics/races.json');

const quotes = [
	"Faz as coisas que tinha que fazer",
	"Da uma cambalhota",
	"Faz nheco nheco",
	"Faz o canguro perneta",
	"Joga truco",
	"Faz o tcheca Tcheca na Butcheca",
	"Faz aquilo :smirk:"
];

module.exports = {
	name: "coisar",
	category: "Amor",
	aliases: ["tchecatechanabutcheca", "sexo"],
	usage: "coisar",
	description: "Eita, coisação",
	run: async (client, message) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		const randQuote = quotes[Math.floor(Math.random()*quotes.length)];

		// Check two
		let rows = await db.all(`SELECT * FROM "world";`);
		const user = rows[rows.findIndex(x => x.id === id)];
		if(!checkTwo(message, user))
			return;
	
		// Marriage infos
		const marriage = user['marriage'];
		const marriageDisease = rows[rows.findIndex(x => x.id === marriage)]['disease'];
		
		// Get Race
		const rand = Math.floor(Math.random() * 100) + 1;
		const race = getRace();
		const raceFormated = raceJson[race]['formated'];

		const delay = 1200000; // 20 Minutos
		if(timeout(delay, id, "coisar", message, `<@${id}>, Sua esposa já voltou ao normal`)) {
			return message.reply(`Sua esposa está naqueles dias, espere um pouco`);
		} else {
			if(rand>=50)
				return message.channel.send(`**${user['name']}** ${randQuote}, sua camisinha funciona como o esperado`);

			let count = user[race]+1;
			let marriageCount = rows[rows.findIndex(x => x.id === marriage)][race]+1;

			db.run(`UPDATE "world" SET "${race}" = CASE "id" WHEN '${id}' THEN ${count} WHEN '${marriage}' THEN ${marriageCount} END WHERE id IN ('${id}', '${marriage}');`);
			message.channel.send(`**${user['name']}** ${randQuote}, a camisinha estoura, dando origem à um(a) \`${raceFormated}\``);
			

			
			// Check AIDS
			if(!user['disease']=="AIDS" && marriageDisease=="AIDS") {
				if(user['disease']=="AIDS") {
					if(rand<=20) {
						db.run(`UPDATE "world" SET "disease" = 'AIDS' WHERE "id"='${marriage}';`);
						message.channel.send(`Infelizmente o vírus da AIDS que <@${marriage}> possui foi transmitido`);
					}
				} else if(marriageDisease=="AIDS") {
					if(rand<=20) {
						db.run(`UPDATE "world" SET "disease" = 'AIDS' WHERE "id"='${id}';`);
						message.channel.send(`Infelizmente o vírus da AIDS que <@${marriage}> possui foi transmitido`);
					}
				}
			}
		};

	}
};

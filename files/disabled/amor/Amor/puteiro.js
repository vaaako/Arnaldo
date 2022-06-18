const fs = require('fs');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const { writeFile, timeout } = require('../../files/scripts/functions.js');
const { 
	amor_db,
	amor_json, 
	checkItem,
	checkUser,
	writeFile,
	timeout,
	getRace 
} = require('../../files/scripts/amor-functions.js');

const raceJson = require('../../files/database/amor/statics/races.json');

const quotes = [
	"Vai na casa de gente boa e faz coisas",
	"Vai pra casa de entreterimento adulto voltado ao público masculino e faz Tuc Tuc Tuc Tu",
	"Vai à um ####### e #### ### #### pra fazer #### com a ####",
	"Sai de casa vai à uma casa de entreterimento e faz *Tom Morello Battle Music*",
	"Joga truco valendo e o toba"
];

module.exports = {
	name: "puteiro",
	category: "Amor",
	aliases: ["casa"],
	usage: "puteiro",
	description: "Lugar de entreterimento adulto voltado para o público masculino",
	run: async (client, message) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		let rows = await db.all(`SELECT * FROM "world";`);
		const user = rows[rows.findIndex(x => x.id === id)];
		if(!checkUser(message, user))
			return;

		const randQuote = quotes[Math.floor(Math.random()*quotes.length)];

		const rand = Math.floor(Math.random() * 100) + 1;
		const race = getRace();
		const raceFormated = raceJson[race]['formated'];


		// const delay = 10000; // 20 Minutos
		const delay = 1200000; // 20 Minutos
		if(timeout(delay, id, "puteiro", message, `<@${id}>, SEEEXOO`)) {
			return message.reply(`Você não é uma máquina de sexo, sossega o cu`);
			// return message.reply(`Você não é uma máquina de sexo, sossega o cu \nTempo restante \`${remainingTime}\``);
		} else {
			let data = fs.readFileSync(amor_json, 'utf-8');
			let obj = JSON.parse(data);

			if(checkItem(obj, id, "viagra")) {
				amount = 2;
				obj[id]['viagra'] = obj[id]['viagra']-1;
				let json = JSON.stringify(obj, null, 1);
				writeFile(amor_json, json);
			}
			else
				amount = 1;

			if(rand>=50) {
				let count = user[race] + amount;

				db.run(`UPDATE "world" SET "${race}"=${count} WHERE "id"='${id}';`);
				return message.channel.send(`**${user['name']}** ${randQuote}, sua camisinha estoura, dando origem à um(a) \`${raceFormated}\``);
			} 
			return message.channel.send(`**${user['name']}** ${randQuote}, sua camisinha funciona como esperado`)
		};

	}
};

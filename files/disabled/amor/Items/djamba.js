const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');
const {
	amor_db,
	amor_json,
	checkUser,
	checkItem,
	writeFile
} = require('../../files/scripts/amor-functions.js');

const quotes = [
	"Você usa a verdinha e começa a ver unicórnios soltando arco-íris",
	"Você usa uma djamba e vê o Bolsonaro de calcinha",
	"Você a djamba e tropeça, bate a cabeça e quase morre",
	"Você usa a verdinha maluca e logo avista um dinossauro amarrado num poste, você berra e implora para tira-lo de lá"
]

module.exports = {
	name: "djamba",
	category: "Items",
	aliases: ["fumar"],
	usage: "djamba",
	description: "Djamba",
	run: async (client, message) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		let rows = await db.all(`SELECT * FROM "world";`);
		const user = rows[rows.findIndex(x => x.id === id)]; // Não pergunte porquê esse é o nome da variável
		if(!checkUser(message, user))
			return;

		let data = fs.readFileSync(amor_json, 'utf-8');
		let obj = JSON.parse(data);

		if(!checkItem(obj, id, "djamba"))
			return message.channel.send("Compre uma djamba antes de poder usar esse comando");

// Câncer de pulmão

		let randQuote = quotes[Math.floor(Math.random()*quotes.length)];
		message.channel.send(randQuote);

		obj[id]['djamba'] = obj[id]['djamba']-1;
		let json = JSON.stringify(obj, null, 1);
		writeFile(amor_json, json);

		let rand = Math.floor(Math.random() * 100) + 1;
		if(rand<=10 && user['disease']!="Câncer de pulmão") {
			db.run(`UPDATE "world" SET "disease"='Câncer de pulmão' WHERE "id"='${id}';`)
			return message.channel.send("Parabéns, você adquiriu Câncer de pulmão")
		}
	}
};

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
	"Você usa uma pinga, chega em casa e bate nos filhos",
	"Você usa uma pinga e acaba agredindo uma puta",
	"Você a pinga e tropeça e desmaia por um tempo",
	"Você da um Glub Glub e acaba sem querer batendo com a cabeça do seu filho contra a parede"
]

module.exports = {
	name: "pinga",
	category: "Items",
	aliases: ["beber"],
	usage: "pinga",
	description: "Beber cair e bate na esposa",
	run: async (client, message) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		let rows = await db.all(`SELECT * FROM "world";`);
		const user = rows[rows.findIndex(x => x.id === id)]; // Não pergunte porquê esse é o nome da variável
		if(!checkUser(message, user))
			return;

		let data = fs.readFileSync(amor_json, 'utf-8');
		let obj = JSON.parse(data);

		if(!checkItem(obj, id, "pinga"))
			return message.channel.send("Compre uma pinga antes de poder usar esse comando");


		let randQuote = quotes[Math.floor(Math.random()*quotes.length)];
		message.channel.send(randQuote);

		obj[id]['pinga'] = obj[id]['pinga']-1;
		let json = JSON.stringify(obj, null, 1);
		writeFile(amor_json, json);

		let rand = Math.floor(Math.random() * 100) + 1;
		if(rand<=20 && user['disease']!="Cirrose") {
			db.run(`UPDATE "world" SET "disease"='Cirrose' WHERE "id"='${id}';`);
			return message.channel.send("Parabéns, você adquiriu Cirrose")
		}
	}
};

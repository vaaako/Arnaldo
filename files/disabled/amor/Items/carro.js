const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');
const {
	amor_db,
	amor_json,
	checkUser,
	checkItem,
	turnMendigo
} = require('../../files/scripts/amor-functions.js');

module.exports = {
	name: "carro",
	category: "Items",
	aliases: ["vrumm"],
	usage: "carro",
	description: "VRUMM VRUMM",
	run: async (client, message) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		let rows = await db.all(`SELECT * FROM "world";`);
		const user = rows[rows.findIndex(x => x.id === id)]; // Não pergunte porquê esse é o nome da variável
		if(!checkUser(message, user))
			return;

		let data = fs.readFileSync(amor_json, 'utf-8');
		let obj = JSON.parse(data);

		if(!checkItem(obj, id, "carro"))
			return message.channel.send("Compre um carro antes de poder usar esse comando");


		let rand = Math.floor(Math.random() * 100);
		console.log(rand)
		if(rand<=10 && ( obj[id]["pinga"] > 0 || obj[id]["djamba"] > 0) ) {
			message.channel.send(`
				Ao sair com seu carro você usa coisas que não deveriam ser usadas enquanto dirige 
				Você avista um paulista e decide atropelá-lo, infelizmente o paulista na verdade era uma árvore 
				Por sorte você não morreu, mas perdeu todas suas Regalias pagando a conta do hospital
			`);
			
			db.run(`UPDATE "world" SET rr=0 WHERE "id"='${id}';`);
			turnMendigo(0, id, message);

			obj[id]['carro'] = obj[id]['carro']-1;
			let json = JSON.stringify(obj, null, 1);
			writeFile(amor_json, json);
		}
		message.channel.send(`:blue_car: :dash: VRUMM VRUMM`);
	}
};

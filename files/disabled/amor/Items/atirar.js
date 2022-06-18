const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');
const {
	amor_db,
	amor_json,
	checkUser,
	checkMarriage,
	clearUser,
	writeFile,
	checkItem
} = require('../../files/scripts/amor-functions.js');

module.exports = {
	name: "atirar",
	category: "Items",
	aliases: ["arma", "matar"],
	usage: "atirar <user>",
	description: "De saco cheio de alguém? Essa é a solução",
	run: async (client, message, args) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		let rows = await db.all(`SELECT * FROM "world";`);
		if(!checkUser(message, rows[rows.findIndex(x => x.id === id)]))
			return;

		let data = fs.readFileSync(amor_json, 'utf-8');
		let obj = JSON.parse(data);

		if(!checkItem(obj, id, "arma"))
			return message.channel.send("Compre uma arma antes de poder usar esse comando");

		// User
		const user = clearUser(args[0]);
		if(!user) return message.channel.send("Mencione alguém  para poder dar um tiro");
		let infeliz = rows[rows.findIndex(x => x.id === user)];
		if(!checkUser(message, infeliz))
			return;

		const rand = Math.floor(Math.random() * 100) + 1;
		obj[id]['arma']-=1;
		
		message.reply(`Você saca a arma, mira em <@${user}> prende a respiração e...`).then((sent) => {
			setTimeout(async () => {
				if(rand<=20) {
					if(checkMarriage(infeliz)) {
						let marriage = rows[rows.findIndex(x => x.id === infeliz['marriage'])]
						db.run(`UPDATE "world" SET marriage="Viúvo(a)" WHERE "id"='${marriage['id']}';`);
					}

					db.run(`DELETE FROM "world" WHERE "id"='${user}';`);
					delete obj[user];
					message.channel.send(`<@${id}>, você \`acerta\` o tiro em <@${user}>`);
				} else {
					
					message.channel.send(`<@${id}>, você \`erra\` o tiro em <@${user}>`);
				}
				
				let json = JSON.stringify(obj, null, 1);
				writeFile(amor_json, json);

			}, 5000);
		}).catch(() => {console.log("Erro -> [Ignore]")});

		let json = JSON.stringify(obj, null, 1);
		writeFile(amor_json, json);
	}
};

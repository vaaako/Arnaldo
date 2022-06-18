const sqlite = require('sqlite');
const sqlite3 = require('sqlite3')
const fs = require('fs');

const {
	amor_db,
	amor_json,
	checkItem,
	writeFile,
	currencyFormat,
	checkUser,
	timeout,
	leaveMendigo
} = require('../../files/scripts/amor-functions.js');
const races = require('../../files/database/amor/statics/races.json');

const quotes = [
	"Botou os filhos pra catar cana",
	"Mandou os seus filhos trabalhar na fábrica",
	"Tirou alguns órgãos de seus filhos para poder vender no mercado negro",
	"Bota seus filhos pra roubar pessoas aleatórias na rua",
	"Faz seus filhos de aviãozinho",
	"Faz seus filhos venderem lol no sinal"
];

module.exports = {
	name: "trabaia",
	category: "Currency",
	aliases: ["trabalhar", "work", "trabaio"],
	usage: "trabaia",
	description: "Bota os filhos pra trabalhar",
	run: async (client, message) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		const randQuote = quotes[Math.floor(Math.random()*quotes.length)];

		let rows = await db.all(`SELECT * FROM "world";`);
		const user = rows[rows.findIndex(x => x.id === id)];
		if(!checkUser(message, user))
			return;

		let data = fs.readFileSync(amor_json, 'utf-8');
		let obj = JSON.parse(data);

		if(checkItem(obj, id, "chicote")) {
			var delay = 1200000; // 20 Minutos
		} else {
			var delay = 1800000; // 30 Minutos
		}

		if(timeout(delay, id, "trabaia", message, `<@${id}>, criança boa é criança trabalhando, bota teus filhos pra trabalhar`)) {
			return message.reply(`Deixa os seus filhos descançarem um pouco`);
		} else {
			// let races = require('../../files/amor/database/races.json');
			var amount = 0;
			var previous = 0;
			Object.keys(races).forEach(function(key) {
				// key - "judeu", "ado_fum" etc
				// races[key]['value'] - Preço por raça
				// user[key] - Quantidade de filhos que o usuário possuí
				if(user[key]!=0)
					amount = (races[key]['value']*user[key])+previous;
				previous = amount; // Se não tiver isso o amount é igual ao último valor
			});


			if(checkItem(obj, id, "whey")) {
				var total = parseFloat(( (amount+user['rr'])*2 ).toFixed(2) );

				obj[id]['whey'] = obj[id]['whey']-1;
				let json = JSON.stringify(obj, null, 1);
				writeFile(amor_json, json);
			} else {
				var total = parseFloat(( amount+user['rr'] ).toFixed(2) );
			}


			db.run(`UPDATE "world" SET "rr"=${total} WHERE "id"='${id}';`);
			message.channel.send(`Você ${randQuote} e ganhou \`RR$${currencyFormat(amount)}\``);

			leaveMendigo(user['mendigo'], total, id, message);
		};
	}
};

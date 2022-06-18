const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const { clearUser } = require('../../files/scripts/text-formatting.js');
const { 
	amor_db, 
	checkUser, 
	checkMarriage,
	death
} = require('../../files/scripts/functions.js');

module.exports = {
	name: "espancar",
	category: "Amor",
	aliases: ["bater", "cellbit"],
	usage: "espancar <user>",
	description: "\"Você perde tudo nas apostas e vira um mendigo \nAs pessoas podem te espancar \no que é o correto a se fazer, lógico.\" \n- Caio",
	run: async (client, message, args) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		let rows = await db.all(`SELECT * FROM "world";`);
		if(!checkUser(message, rows[rows.findIndex(x => x.id === id)]))
			return;

		// User
		const user = clearUser(args[0]);
		if(!user) return message.channel.send("Mencione um pobre pra poder espancar");
		if(user==id) return message.channel.send("Sem masoquismo");
		
		const mendigo = rows[rows.findIndex(x => x.id === user)];
		if(!checkUser(message, mendigo))
			return;

		const delay = 3600000; // 1 hora
		if(timeout(delay, id, "espancar", message, `<@${id}>, você já pode espancar pobre de novo`)) {
			return message.reply(`Eu sei que é chato mas você precisa esperar pra espancar o pobre`);
			// return message.reply(`Você não é uma máquina de sexo, sossega o cu \nTempo restante \`${remainingTime}\``);
		} else {
			if(mendigo['mendigo']==-1)
				return message.channel.send("Só pode bater na peble");

			let count = mendigo['mendigo']+1;

			if(count>=4) { // >= Só pra ter certeza
				if(checkMarriage(mendigo)) {
					let marriage = rows[rows.findIndex(x => x.id === mendigo['marriage'])]
					db.run(`UPDATE "world" SET marriage="Viúvo(a)" WHERE "id"='${marriage['id']}';`);
				}
				
				delete obj[id];
				db.run(`DELETE FROM "world" WHERE "id"='${user}';`)
				return message.channel.send(`<@${user}>, você foi espancado por <@${id}> e morreu`);
			}

			db.run(`UPDATE "world" SET "mendigo"=${count} WHERE "id"='${user}';`);
			message.channel.send(`<@${user}>, você foi espancado por <@${id}> \nVocê está à **${4-count}** espancamentos de morrer`)

			db.close();
		};
	}
};

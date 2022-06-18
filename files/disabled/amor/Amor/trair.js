const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const { 
	amor_db, 
	checkTwo
} = require('../../files/scripts/amor-functions.js');
const races = require('../../files/database/amor/statics/races.json');

module.exports = {
	name: "trair",
	category: "Amor",
	aliases: [],
	usage: "trair",
	description: "Mas que coisa feia",
	run: async (client, message) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		let rows = await db.all(`SELECT * FROM "world";`);
		const user = rows[rows.findIndex(x => x.id === id)];
		if(!checkTwo(message, user))
			return;
		const marriage = user['marriage'];

		// collector
		var msg = await message.reply(`Você quer mesmo fazer isso?`);
		msg.react('✅');
		msg.react('❌');

		
		const filter = (reaction, member) => {
			return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && member.id === id;
		};
	
		const collector = msg.createReactionCollector({ filter, time: 10000, max: 1 });
		collector.on('collect', async(reaction, member) => {
			const react = reaction.emoji.name;

			if(react==='❌')
				return message.channel.send("Mais cuidado");
			if(react==='✅')
				;

			// Murder
			msg.delete();
			msg = await message.channel.send(`<@${marriage}>, você tem 30seg para se salvar, antes que seja tarde demais`);
			msg.react('✅');

			const filter = (reaction, member) => {
				return reaction.emoji.name === '✅' && member.id === marriage;//id;
			};
			const collectorMurder = msg.createReactionCollector({ filter, time: 3000, max: 1 }); // O filter PRECISA se chamar "filter"
			collectorMurder.on('collect', (reaction, member) => {
				if(react==='✅') {
					message.channel.send("Salvo <:amein:902535334196305961>");
				}
			});
	
			collectorMurder.on('end', collected => {
				if(collected.size==0) {
					let sql = `UPDATE "world" SET "marriage"="Viúvo(a)"`
					Object.keys(races).forEach(function(key) { // Passando races para um string, para poder executar db.run(); apenas uma vez
						let amount =  user[key] + rows[rows.findIndex(x => x.id === user['marriage'])][key]; // Marriage
					   sql = sql + ` ,\"${key}\" = ${amount} `
					});
					db.run(sql.slice(0, -1) + ` WHERE "id"=${id};`)
					db.run(`DELETE FROM "world" WHERE "id"='${marriage}';`);
		
					message.channel.send(`<@${marriage}>, você foi morto pela pessoa que jurou te amar e proteger, que tristeza você ter confiado nele algum dia \n<@${id}>, valeu a pena?`);
				}
			});

		}); // Fim do collector
		
		collector.on('end', collected => {
			if(collected.size==0) {
				return message.channel.send("Vale a pena?");
			}
		});


 
	}
};

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const { 
	amor_db, 
	checkTwo, 
	turnMendigo,
	leaveMendigo,
	countSons
} = require('../../files/scripts/amor-functions.js');

module.exports = {
	name: "divorcio",
	category: "Amor",
	aliases: ["separar", "pensao"],
	usage: "divorcio",
	description: 'O casamento não deu certo? \n"Se não deu certo tem que separar mesmo" \n- Minha bisavó',
	run: async (client, message) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		let rows = await db.all(`SELECT * FROM "world";`);
		console.log(rows)
		const user = rows[rows.findIndex(x => x.id === id)];
		if(!checkTwo(message, user)) 
			return; // Coloquei numa lista, pois a função pega o primeiro index


		// Get marriage infos
		const marriage = user['marriage'];
		const rrMarriage = rows[rows.findIndex(x => x.id === marriage)]['rr']; // Pegando index do parceiro

		// Pensão
		let total = countSons(rows[rows.findIndex(x => x.id === marriage)]);
		// var pensao = ((rrMarriage/2)/total).toFixed(2);
		var pensao = (rrMarriage*total)/100;
		pensao = (isNaN(pensao)) ? 0.00 : parseFloat(pensao);

		const amount = parseFloat( user['rr']+(rrMarriage-pensao) ); // Amount


		// collector
		let msg = await message.reply(`<@${id}>, você quer mesmo se divorciar de <@${marriage}>?`);
		msg.react('✅');
		msg.react('❌');

		
		const filter = (reaction, member) => {
			return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && member.id === id;
		};

		const collector = msg.createReactionCollector({ filter, time: 10000, max: 1 });
		collector.on('collect', (reaction, member) => {
			const react = reaction.emoji.name;

			if(react==='❌')
				return message.channel.send("Foi só um susto");
			if(react==='✅')
				;
			
			// Como pode ver eu não entendo nada de SQL
			db.run(`UPDATE "world" SET "rr" = CASE "id" WHEN ${id} THEN ${amount} WHEN ${marriage} THEN ${pensao} END WHERE id IN ('${id}', '${marriage}');`);
			db.run(`UPDATE "world" SET "marriage" = CASE "id" WHEN '${id}' THEN 'Divorciado' WHEN '${marriage}' THEN 'Divorciado' END WHERE id IN ('${id}', '${marriage}');`);
			// Eu não sei o que estou fazendo
			// Socorro

			leaveMendigo(user['mendigo'], amount, id);
			turnMendigo(pensao, marriage, message);

			message.channel.send("Mas que infeliz notícia");
			
			db.close();
		}); // Fim do collector
		
		collector.on('end', collected => {
			if(collected.size==0) {
				return message.channel.send("Pense pense pensa");
			}
		});

	}
};

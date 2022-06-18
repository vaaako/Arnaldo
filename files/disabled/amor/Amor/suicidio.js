const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const { 
	amor_db, 
	death,
	checkUser
} = require('../../files/scripts/amor-functions.js');

const quotes = [
	"Você não aguenta viver no mesmo mundo que furrys e se mata",
	"Você não suporta o fato de que fazem sexo sem amor e se mata",
	"Você tropeça numa casca de banana e morre",
	"Ninguém acreditava nos seus status do bart triste, logo você se matou pra provar"
]

module.exports = {
	name: "suicidio",
	category: "Amor",
	aliases: ["memata", "mematar", "morrer", "suicidar"],
	usage: "suicidio",
	description: "A saída mais rápida",
	run: async (client, message) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		const rows = await db.all(`SELECT * FROM "world";`);
		const user = rows[rows.findIndex(x => x.id === id)]; // Não pergunte porquê esse é o nome da variável
		if(!checkUser(message, user))
			return;

		var msg = await message.reply("Quer mesmo fazer isso? Não vai ter volta");
		msg.react('✅');
		msg.react('❌');

		
		const filter = (reaction, member) => {
			return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && member.id === id;
		};
	
		const collector = msg.createReactionCollector({ filter, time: 10000, max: 1 });
		collector.on('collect', async(reaction, member) => {
			const react = reaction.emoji.name;

			if(react==='❌')
				return message.channel.send("Melhor mesmo");
			if(react==='✅')
				;

		
			death(id, rows); // Run death function
			
			let randQuote = quotes[Math.floor(Math.random()*quotes.length)];
			message.channel.send(randQuote);
		});
		
		collector.on('end', collected => {
			if(collected.size==0) {
				return message.channel.send("Vou te dar mais um tempo pra pensar nisso");
			} 
		});
	}
};

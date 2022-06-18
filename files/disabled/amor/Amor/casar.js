const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const { clearUser } = require('../../files/scripts/text-formatting.js');
const { 
	amor_db, 
	checkUser,
	checkMarriage
} = require('../../files/scripts/amor-functions.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "casar",
	category: "Amor",
	aliases: ["marry"],
	usage: "casar <user>",
	description: "Casamento é algo sério, pense bem antes de pedir alguém em casamento",
	run: async (client, message, args) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		// Check user
		let rows = await db.all(`SELECT * FROM "world";`);
		const user = rows[rows.findIndex(x => x.id === id)];
		if(!checkUser(message, user))
			return;

		// Check parceiro
		var parceiro = clearUser(args[0]);
		console.log(parceiro)
		if(!parceiro) return message.channel.send("Você esqueceu de mencionar com quem você deseja se casar");
		if(id==parceiro) return message.channel.send("Você não quer dar uma de incel né?");
		parceiro = rows[rows.findIndex(x => x.id === parceiro)]
		if(!checkUser(message, parceiro)) 
			return;

		// Check marry
		if(checkMarriage(user))
			return message.channel.send(`<@${parceiro['marriage']}>, SUA ESPOSA ESTÁ TENTANDO TE TRAIR`);
		else if(checkMarriage(parceiro))
			return message.channel.send(`<@${user['marriage']}>, SUA ESPOSA ESTÁ TENTANDO TE TRAIR`);


		let msg = await message.reply(`<@${parceiro['id']}>, você aceita <@${id}> como sua legítima esposa?`);
		msg.react('✅');
		msg.react('❌');

		
		const filter = (reaction, member) => {
			return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && member.id === parceiro['id'];
		};

		const collector = msg.createReactionCollector({ filter, time: 10000, max: 1 });
		collector.on('collect', (reaction, member) => {
			const react = reaction.emoji.name;

			if(react==='❌')
				return message.channel.send("Eu protesto!");
			if(react==='✅')
				;

			if( (user['disease']=="Gay" && parceiro['gender']!=user['gender']) || (parceiro['disease']=="Gay" && user['gender']!=parceiro['gender']) )
				return message.channel.send("Gays só podem se casar com alguém do mesmo gênero");

			if(user['gender']==parceiro['gender']) {
				db.run(`UPDATE "world" SET disease = CASE "id" WHEN '${id}' THEN 'Gay' WHEN '${parceiro['id']}' THEN 'Gay' END WHERE id IN ('${parceiro['id']}', '${id}');`);
			}

			db.run(`UPDATE "world" SET marriage = CASE "id" WHEN '${id}' THEN '${parceiro['id']}' WHEN '${parceiro['id']}' THEN '${id}' END WHERE id IN ('${parceiro['id']}', '${id}');`);
			return message.channel.send("Mas que casal lindo! Espero que um não traia o outro :smiley:");
		}); // Fim do collector
		
		collector.on('end', collected => {
			if(collected.size==0) {
				return message.channel.send("Demorou demais pra pensar");
			}
		});
	}
};

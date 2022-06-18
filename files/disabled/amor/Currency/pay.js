const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const { 
	amor_db, 
	checkUser, 
	clearUser, 
	currencyFormat, 
	impostoCalc,
	turnMendigo,
	leaveMendigo
} = require('../../files/scripts/amor-functions.js')

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "pay",
	category: "Currency",
	aliases: ["pagar"],
	usage: "pagar <user> <amount>",
	description: "Aceitas pix?",
	run: async (client, message, args) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		let rows = await db.all(`SELECT * FROM "world";`);
		const pagante = rows[rows.findIndex(x => x.id === id)]; // Não pergunte porquê esse é o nome da variável
		if(!checkUser(message, pagante))
			return;


		// User
		const user = clearUser(args[0]);
		if(!user) return message.channel.send("Mencione um usuário válido para poder pagar");
		if(user==id) return message.channel.send("Você sabe que não dá e mesmo assim tenta, por quê?");
		const agiota = rows[rows.findIndex(x => x.id === user)]; // Sem ideia pra nome de variável
		if(!checkUser(message, [agiota]))
			return;

		// Amount
		var amount = args[1];
		if(!amount) return message.channel.send("Eu não sou a porra do professor xavier pra ler a sua mente e saber a quantia que você quer enviar");
		
		amount = amount.replace(",", ".");
		if(isNaN(amount)) return message.channel.send(`Eu acho que \`${amount}\` não é um número válido`);
		amount = parseFloat( amount ); // Passando amount para float

		// Check amount   
		// (price*5)/100
		// const imposto = parseFloat( ((Math.random() * 5) + 1).toFixed(2) );
		const imposto = impostoCalc(amount);
		amountImposto = parseFloat( (imposto+amount).toFixed(2) );
		if(amountImposto>pagante['rr']) return message.channel.send("Você não possuí Regalias do Renato o suficiente para pagar o valor mais impostos \nPobrekk");

		// collector
		var msg = await message.reply(`Você quer mesmo pagar \`RR$${currencyFormat(amount)}\`+\`RR$${currencyFormat(imposto)}\` de impostos para <@${user}>?`);
		msg.react('✅');
		msg.react('❌');
		
		const filter = (reaction, member) => {
			return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && member.id === id;
		};
	
		const collector = msg.createReactionCollector({ filter, time: 7000, max: 1 });
		collector.on('collect', async(reaction, member) => {
			const react = reaction.emoji.name;

			if(react==='❌')
				return message.channel.send("Pagamento cancelado");
			if(react==='✅')
				;

			let lose = pagante['rr']-amountImposto;
			let earn = agiota['rr']+amount;

			db.run(`UPDATE "world" SET "rr" = CASE "id" WHEN '${id}' THEN ${lose} WHEN '${user}' THEN ${earn} END WHERE id IN ('${id}', '${user}');`)
			let embed = new MessageEmbed()
				.addFields(
					{ name: "Você pagou", value: `\`RR$${currencyFormat(amount)}\` + \`R$${currencyFormat(imposto)}\` de impostos` },
					{ name: "Suas Regalias", value: `\`RR$${currencyFormat(lose)}\`` },
					{ name: `Regalias de ${agiota['name']}`, value: `\`RR$${currencyFormat(earn)}\`` }
				)
				.setColor(ee.color);
			message.channel.send("Pagamento realizado com sucesso!");
			message.channel.send({ embeds: [embed] });

			turnMendigo(lose, id, message);
			leaveMendigo(agiota['mendigo'], earn, user, message);
		});
		
		collector.on('end', collected => {
			if(collected.size==0) {
				return message.channel.send("Pagamento cancelado");
			}
		});
	}
};

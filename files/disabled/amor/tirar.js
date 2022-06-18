const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const { clearUser, currencyFormat } = require('../../files/scripts/text-formatting.js');
const {
	amor_db, 
	checkUser, 
	turnMendigo, 
} = require('../../files/scripts/amor-functions.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "tirar",
	category: "",
	aliases: ["remover"],
	usage: "tirar <user> <amount>",
	description: "Erro",
	whitelistOnly: true,
	run: async (client, message, args) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		// User
		// const user = getUser(client, args[0]);
		let rows = await db.all(`SELECT * FROM "world";`);
		const user = clearUser(args[0]);
		if(!user) return message.channel.send("Mencione um usuário válido para poder remover suas Regalias");
		const agiota = rows[rows.findIndex(x => x.id === user)]; // Sem ideia pra nome de variável
		if(!checkUser(message, [agiota]))
			return;

		// Amount
		var amount = args[1];
		if(!amount) return message.channel.send("Eu não sou a porra do professor xavier pra ler a sua mente e saber a quantia que você quer retirar");
		
		amount = amount.replace(",", ".");
		if(isNaN(amount)) return message.channel.send(`Eu acho que \`${amount}\` não é um número válido`);
		amount = parseFloat( amount ); // Passando amount para float

		// collector
		var msg = await message.reply(`Você quer mesmo retirar \`RR$${currencyFormat(amount)}\` de <@${user}>?`);
		msg.react('✅');
		msg.react('❌');

		
		const filter = (reaction, member) => {
			return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && member.id === id;
		};
	
		const collector = msg.createReactionCollector({ filter, time: 7000, max: 1 });
		collector.on('collect', async(reaction, member) => {
			const react = reaction.emoji.name;

			if(react==='❌')
				return message.channel.send("Remoção cancelado");
			if(react==='✅')
				;

		
			let earn = agiota['rr']-amount;
			db.run(`UPDATE "world" SET "rr" = ${earn} WHERE "id" = '${user}';`)
			let embed = new MessageEmbed()
				.addFields(
					{ name: "Você removeu", value: `\`RR$${currencyFormat(amount)}\`` },
					{ name: `Regalias de ${agiota['name']}`, value: `\`RR$${currencyFormat(earn)}\`` }
				)
				.setColor(ee.color);
			message.channel.send("Remoção realizado com sucesso!");
			message.channel.send({ embeds: [embed] });
			turnMendigo(earn, user, message)
		});
		
		collector.on('end', collected => {
			if(collected.size==0) {
				return message.channel.send("Remoção cancelado");
			} 
		});
	}
};

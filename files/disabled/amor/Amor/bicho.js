const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const { clearUser, currencyFormat } = require('../../files/scripts/text-formatting.js');
const { 
	amor_db, 
	checkUser, 
	getBicho, 
	checkBicho, 
	turnMendigo,
	leaveMendigo
} = require('../../files/scripts/amor-functions.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "bicho",
	category: "Amor",
	aliases: ["apostar"],
	usage: "bicho <nums | name> <aposta>",
	description: "Hora de virar bicheiro. \nSe você acertar pelo nome do bicho ganha 5x o valor apostado, se ganhar pelos números do bicho ganha 2x o valor apostado",
	run: async (client, message, args) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;
		
		// Check
		let rows = await db.all(`SELECT rr, mendigo FROM "world" WHERE "id"=${id};`);
		if(!checkUser(message, rows)) 
			return;

		const rr = rows[0]['rr'];

		// myNum
		const myNum = args[0];
		if(!myNum) 
			return message.channel.send("Você precisa escrever o nome ou número do animal que você quer apostar \nDigite `]tabela` para ver bichos disponíveis");
		if(!checkBicho(myNum)) return message.channel.send("Bicho indisponível!");

		// Amount
		var amount = args[1];
		if(!amount) return message.channel.send("Você precisa apostar pra jogar no bicho");
		if(amount<10) return message.channel.send("O valor mínimo de aposta são `RR$10.00` \nPobrekk");
		amount = amount.replace(",", ".");
		if(isNaN(amount)) return message.channel.send(`Eu acho que \`${amount}\` não é um número válido`);
		amount = parseFloat(amount); // Passando amount para float
		if(amount>rr) return message.channel.send("Você não tem tudo isso de Regalias, pobre");

		const bichos = getBicho(myNum);

		const result = bichos[0];
		const bichoName = bichos[1];
		const numbers = bichos[4];

		var embed = new MessageEmbed().setColor(ee.color);

		message.reply("Aposta feita, espere até sair o resultado").then((sent) => {
			setTimeout(() => {

				if(result)
					if(bichoName.toLowerCase()==myNum) { // 5x
						var ganho = parseFloat( ((amount*5)+rr) ).toFixed(2); // Converti só pra ter certeza
						var valorString = `RR$${ currencyFormat(amount*5)}`;

						db.run(`UPDATE "world" SET "rr"=${ganho} WHERE "id"=${id};`);
						embed.setTitle(`Parabéns, você ganhou o prêmio máximo`);

					} else { // 2x
						var ganho = parseFloat( ((amount*2)+rr) );
						var valorString = `RR$${ currencyFormat(amount*2) }`;

						db.run(`UPDATE "world" SET "rr"=${ganho} WHERE "id"=${id};`);
						embed.setTitle(`Ganhou!`);
					}
				else {
					var ganho = parseFloat( (rr-amount) ).toFixed(2);
					var valorString = `RR$-${ currencyFormat(amount) }`;

					db.run(`UPDATE "world" SET "rr"=${ganho} WHERE "id"=${id};`);
					embed.setTitle(`Perdeu!`);

				}

				embed.setDescription(`**Bicho: **\`${bichoName}\` \n**Números: **\`${numbers.join(', ')}\` \n\n**Ganho: **\`${valorString}\``);
				message.reply({ embeds: [embed] });

				// Check mendigo
				turnMendigo(ganho, id, message);
				leaveMendigo(rows[0]['mendigo'], rr+ganho, id, message);

			}, 60_000);
		}).catch(() => {console.log("Erro -> Delete message [Ignore]")});
	}
};

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');
const items = require('../../files/database/amor/statics/store.json');

// Galo
const cocks = require('../../files/database/amor/statics/cocks.json'); // Cocks kkkkkkkk
const { capitalize, titleCase, clearSpaces } = require('../../files/scripts/functions.js');
const { prefix } = require('../../config/config.js');

const { 
	amor_db,
	amor_json, 
	writeFile,
	checkUser, 
	addDefaultItems,
	findKey, 
	impostoCalc,
	currencyFormat, 
	turnMendigo
} = require('../../files/scripts/amor-functions.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "buy",
	category: "Currency",
	aliases: ["comprar", "adquirir"],
	usage: "buy <item>",
	description: "Compra compra compra (Digite o nome do item corretamente)",
	run: async (client, message, args) => {
		// Check
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		let rows = await db.all(`SELECT rr FROM "world" WHERE "id"='${id}';`);
		if(!checkUser(message, rows))
			return;
		// EndCheck

		const dindin = parseFloat(rows[0]['rr']);
		
		// Resto do código
		var item = clearSpaces(args[0]);
		if(!item || !findKey(items, item)) {
			db.run(`UPDATE "world" SET rr=${dindin-2.50} WHERE "id"='${id}';`);
			return message.channel.send("Você vai à loja sem saber o que comprar, olha alguns itens e compra um halls para não parecer que você estava roubando algo. `RR$-2.50`");
		}
		
		item = item.toLowerCase();
		const price = parseFloat(items[item]);
		const imposto = impostoCalc(price);
		const total = price+imposto;

		/**
		 * @Json
		 */
		let data = fs.readFileSync(amor_json, 'utf-8');
		let obj = JSON.parse(data);

		// Se não tiver
		if(!findKey(obj, id)) {
			addDefaultItems(obj, id)
			let json = JSON.stringify(obj, null, 1);
			writeFile(amor_json, json);
		};
		if( (item=="carro" && obj[id]['carro']>=1) || (item=="chicote" && obj[id]['chicote']>=1) )
			return message.channel.send("Você já possui um desse, pra que dois?");
		/**
		 * @EndJson
		 */
		// Verify dindin
		if(total>dindin)
			return message.channel.send("Pobre");
		
		// Cocks
		if(item=="galo" || item=="cock") {
			if(findKey(obj[id], "galo"))
				return message.channel.send("Você já possui um galo");


			let race = args.slice(1).join(" ");
			if (!race)
				return message.channel.send(`Você não digitou a raça do seu galo \nUse o comando \`${prefix}galo cocks\`, para poder ver as raças disponíveis`);
			race = race.toLowerCase().trim()
					.replace("é", 'e')
					.replace(" ", "_");

			if (!findKey(cocks['modifiers'], race))
				return message.channel.send(`Escolha uma raça de galo existente \nDigite \`${prefix}galo cocks\` para ver as raças disponíveis`);

			const filter = m => m.author.id == message.author.id;
			message.reply("Envie uma mensagem com o nome do seu galo", { fetchReply: true })
				.then(() => {
					message.channel.awaitMessages({ filter, max: 1, time: 20000, errors: ['time'] })
						.then(collected => {
							let name = titleCase(collected.first().content);

							let raceMod = cocks['modifiers'][race];

							// Math.floor(Math.random() * (max - min + 1)) + min;
							// let hp  = raceMod[0] + Math.floor(Math.random() * (7 - 1 + 1)) + 1; // 1 - 7
							let hp  = raceMod[0] + 1; // Eu poderia adicionar esses "1" no json, mas prefiro fazer aqui pra não me confundir
							let atk = raceMod[1] + 1;
							let def = raceMod[2] + 1;
							let spd = raceMod[3] + 1;

							// Add to json
							Object.assign(obj[id], {
								"galo": {
									"name": name,
									"race": race,
									"level": 1,
									"hp": hp,
									"attack": atk,
									"defense": def,
									"speed": spd,
									"owner": id,
									"victories": 0,
									"losses": 0,
									"points": 12
								}
							});

							let embed = new MessageEmbed()
								.addFields(
									{ name: name, value: cocks['long_names'][race], inline: false },
									{ name: `Nível`, value: "1" , inline: false },
									{ name: 'Pontos', value: "12", inline: true}, // Blank space
					
									{ name: '\u200B', value: '\u200B', inline: false}, // Blank space
									{ name: `Dados`, value: `Vitórias: \`0\` \nDerrotas: \`0\` \nWin rate: \`0.0%\``, inline: true},
									
									{ name: '\u200B', value: '\u200B', inline: true }, // Blank space
									{ name: `Stats`, value: `HP: \`${hp}\` \nATTACK: \`${atk}\` \nDEFENSE: \`${def}\` \nSPEED: \`${spd}\``, inline: true },
									
								)
								.setThumbnail(cocks['images'][race])
								.setFooter({ text: `Versão ${ee.version}` })
								.setColor(ee.color);
							message.channel.send({ embeds: [embed] });
							message.channel.send(`Parabéns pela aquisição de seu cock \nUse o comando \`${prefix}galo treinar <status>\` para upar algum status de seu cock, você possui 12 pontos restantes`);

							db.run(`UPDATE "world" SET rr=${dindin - total} WHERE "id"='${id}';`);
							turnMendigo(dindin - total, id, message);

							let json = JSON.stringify(obj, null, 1);
							writeFile(amor_json, json);
						})
					.catch(collected => {
						if(collected.size==0) {
							message.channel.send("Compra cancelada");
						};
					});
				});
			return;
		};




		// Add item
		obj[id][item] = obj[id][item]+1;
		let json = JSON.stringify(obj, null, 1);
		writeFile(amor_json, json);

		db.run(`UPDATE "world" SET rr=${dindin-total} WHERE "id"='${id}';`);
		turnMendigo(dindin-total, id, message);

		let embed = new MessageEmbed()
			.addFields(
				{ name: "Você pagou", value: `\`RR$${currencyFormat(price)}\` + \`RR$${currencyFormat(imposto)}\` de impostos` },
				{ name: "Suas Regalias", value: `\`RR$${currencyFormat(dindin-total)}\`` }
			)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
		

	}
};

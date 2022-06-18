const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');
const { prefix } = require('../../config/config.js');
const cocks = require('../../files/database/amor/statics/cocks.json'); // Cocks kkkkkkkk

const {
	amor_db,
	amor_json,
	writeFile,
	checkUser,
	clearUser,
	findKey,
	timeout,
	turnMendigo,
	leaveMendigo
} = require('../../files/scripts/functions.js');
const { capitalize, titleCase, clearSpaces } = require('../../files/scripts/functions.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

// function formatRace(race) {
// 	return race.toLowerCase().trim()
// 		.replace("é", 'e')
// 		.replace(" ", "_");
// }

module.exports = {
	name: "galo",
	category: "Items",
	aliases: ["galinha", "cock"],
	usage: "galo [cocks | treinar | rinha]",
	description: "Tenha o melhor galo de combate",
	run: async (client, message, args) => {
		// Check
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;

		const rows = await db.all(`SELECT * FROM "world";`);
		if(!checkUser(message, rows[rows.findIndex(x => x.id === id)]))
			return;
		// EndCheck

		const data = fs.readFileSync(amor_json, 'utf-8');
		const obj = JSON.parse(data);

		if(args[0] == "races" || args[0] == "raças" || args[0] == "cocks") {
			let cocksArray = [];
			for (let i = 0; i < Object.keys(cocks['modifiers']).length; i++) {
				let cock = Object.keys(cocks['modifiers'])[i];

				let cockRace = cocks['names'][cock];
				let cockImage = cocks['images'][cock];
				let cockModifier = cocks['modifiers_formated'][cock];

				cocksArray.push(`- [${cockRace}](${cockImage}) (${cockModifier})`);
			};
			let embed = new MessageEmbed()
				.setDescription(cocksArray.join("\n"))
				.setColor(ee.color);
			return message.channel.send({ embeds: [embed] });
		};

		// Verify cock
		if(!findKey(obj, id) || !findKey(obj[id], "galo"))
			return message.channel.send("Você não possuí um galo");
		

		if(args[0] == "treino" || args[0] == "treinar") {
			if(obj[id]['galo']['points']<=0)
				return message.channel.send("Você não possui pontos");
			
			let pinga = {
				"hp": "hp",
				"atk": "attack",
				"def": "defense",
				"spe": "speed",
			}

			let stat = args[1];
			if(!stat)
				return message.channel.send(`Você precisa escolher um status pra upar. \nEx. \`${prefix}galo treinar defense\``);
			stat = stat.toLowerCase()
					.substring(0, 3)
					.replace("att", "atk");

			if(!Object.keys(pinga).includes(stat))
				return message.channel.send(`Status incorreto \nOs status possíveis são: \`hp\`, \`attack\`, \`defense\` e \`speed\``);

		
			stat = pinga[stat];
	
			let delay = 18_000_000; // 5 horas
			if(timeout(delay, id, "galo", message, `<@${id}>, Seu galo está descansado`)) {
				return message.reply(`Seu galo está descansando`);
			}
			
			let cock = obj[id]['galo'];
			cock[stat] += 1;
			cock['level'] += 1;
			cock['points'] -= 1;

			message.channel.send(`Seu cock recebeu \`+1 ${capitalize(stat)}\` \nNice Cock`);
			let json = JSON.stringify(obj, null, 1);
			writeFile(amor_json, json);





		/**
		 * @Rinha
		 */
		} else if(args[0] == "rinha" || args[0] == "rinhar") {

			// Rinha functions
			function fightAction(user, enemy) {
				let fightQuotes = [
					`**${user}** bica com vontade, **${enemy}** fica muito bravo com a situação`,
					`**${user}** joga areia nos zoi de **${enemy}**`,
					`**${user}** concentra suas forças e aplica a 7° forma da respiração Aviária, Esporada reluzente divina`,
					`**${user}** começa a concentrar um poder azulado em meio as suas asas, esse poder rápidamente se transforma em uma bola azul de energia que é lançada em direção à **${enemy}**`
				];
				
				return fightQuotes[Math.floor(Math.random()*fightQuotes.length)];
			}

			async function sendEmbed(text) {
				let embed = new MessageEmbed()
					.setDescription( text )
					.setColor('36393E');
				await message.channel.send({ embeds: [embed] });
			}


			// Just check
			let enemy = clearUser(args[1])
			if(!enemy)
				return message.channel.send("Você precisa mencionar com quem deseja rinhar");

			if(!findKey(obj, enemy) || !findKey(obj[enemy], "galo"))
				return message.channel.send("Seu oponente não possui um galo pra rinhar");

			if(enemy==id)
				return message.channel.send("Não");

			// Check money
			var amount = args[2];
			if(!amount) return message.channel.send("Você precisa apostar pra rinhar");
			if(amount<10) return message.channel.send("Valor mínimo de `RR$10.00`");
			amount = parseFloat(amount.replace(",", "."));
			if(isNaN(amount)) return message.channel.send(`Eu acho que \`${amount}\` não é um número válido`);
			if(amount>rows[rows.findIndex(x => x.id === id)]['rr']) return message.channel.send("Você não possui tudo isso de Regalias");


			// Cock infos
			let enemyCock = obj[enemy]['galo'];
			let userCock = obj[id]['galo'];

			( (userCock['speed']==enemyCock['speed'] && (Math.floor(Math.random() * 2) + 1) == 1) || (userCock['speed']>enemyCock['speed']) ) ?
			(first = userCock, last = enemyCock) : // Caso a velocidade do enemy e usar sejam as mesmas e o rand for igual a 1
			(first = enemyCock, last = userCock); // Caso contrário


			const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // Desse jeito não pausa o bot enquanto está em sleep

			// Rinha start
			let msg = await message.reply(`<@${enemy}>, você aceita rinhar com <@${id}> valendo \`RR$${amount}\`?`);
			msg.react('✅');
			msg.react('❌');
			
			const filter = (reaction, member) => {
				return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && member.id === enemy;
				// return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && member.id === id;
			};
	
			const collector = msg.createReactionCollector({ filter, time: 30000, max: 1 });
			collector.on('collect', async (reaction, member) => {
				const react = reaction.emoji.name;
	
				if(react==='❌')
					return message.channel.send("Sem rinha :pensive:");
				if(react==='✅')
					;
				// Last check

				let delay = 18_000_000; // 12 horas
				if(timeout(delay, id, "galo", message, `<@${id}>, Seu galo está descansado`)) {
					return message.reply(`Seu galo está descansando`);
				}

				// Start
				var critical = "";
				var userHD = userCock['hp'] + userCock['defense']; // HD = Helath + Defense
				var enemyHD = enemyCock['hp'] + enemyCock['defense'];

				while(userHD > 0 || enemyHD > 0) {

					let damage  = first['attack'];
					
					// Crítico
					if(first['race']=="galo_sniper" && (Math.floor(Math.random() * 100) + 1)<=20) {
						damage = damage*2;
						critical = "\n`Crítico`";
					}
					else if(first['race']!="galo_sniper" && (Math.floor(Math.random() * 100) + 1)<=10) {
						damage = damage*2;
						critical = "\n`Crítico`";
					}
				
					// console.log(first['name'])
					// console.log(`U - ${userHD} / E - ${enemyHD}`)
					// console.log(damage);
					
					// Se o primeiro não for user o dano vai pro enemy e vice versa
					(first!=userCock) ? userHD-=damage :  enemyHD-=damage; // Apenas para saber de quem tirar o dano

					// console.log(`U - ${userHD} / E - ${enemyHD}\n`)

					// await message.channel.send(`${first['name']} causou \`${damage} de dano\` em ${last['name']} \nVida de <@${enemy}>: ${enemyHD} \nVida de <@${userCock['owner']}>: ${userHD}`); // Dev Only
					sendEmbed( fightAction(first['name'], last['name'])+critical );
					critical = "";
	
					await sleep(5000);
					if(userHD <= 0 || enemyHD <= 0) {
						sendEmbed( `**${last['name']}** desmaiou em meio a luta` )
						
						// Change victories and loseses
						first['victories'] += 1;
						last['losses'] += 1;

						first['points'] += 1;

						let json = JSON.stringify(obj, null, 1);
						writeFile(amor_json, json);

						let earn = rows[rows.findIndex(x => x.id === first['owner'])]['rr']+amount;
						let lost = rows[rows.findIndex(x => x.id === last['owner'])]['rr']-amount; // Eu não ligo que esteja errado
						
						// Change money
						db.run(`UPDATE "world" SET "rr" = CASE "id" WHEN '${first['owner']}' THEN ${earn} WHEN '${last['owner']}' THEN ${lost} END WHERE id IN ('${first['owner']}', '${last['owner']}');`)
						turnMendigo(lost, last['owner'], message);
						leaveMendigo(rows[rows.findIndex(x => x.id === first['owner'])]['mendigo'], earn, id, message);

						return;
					}
	
					last = [first, first = last][0]; // Swap 'first' and 'last' values
				};
			}); // Fim do collector
			
			collector.on('end', collected => {
				if(collected.size==0) {
					return message.channel.send("Rinha cancelada");
				}
			});

			return;
		}





		else {
			let user = clearUser(args[0]) || id;
			// ajeitar aqui
			if(!findKey(obj, user) || !findKey(obj[user], "galo"))
				return message.channel.send(`Você ainda não tem um galo, compre um por apenas \`RR$50\`, digite \`${prefix}galo cocks\` para ver as raças disponíveis`);

			let cock = obj[user]['galo'];

			let pindamonhangaba = ((cock['victories']/(cock['victories']+cock['losses']) )*100).toFixed(2);
			let winRate = ( isNaN(pindamonhangaba) ) ? 0 : pindamonhangaba;
			
			let embed = new MessageEmbed()
				.addFields(
					{ name: cock['name'], value: cocks['long_names'][cock['race']], inline: false },
					{ name: `Nível`, value: cock['level'].toString() , inline: true },
					{ name: 'Pontos', value: cock['points'].toString(), inline: true}, // Blank space
					
					{ name: '\u200B', value: '\u200B', inline: false}, // Blank space
					{ name: `Dados`, value: `Vitórias: \`${cock['victories']}\` \nDerrotas: \`${cock['losses']}\` \nWin rate: \`${winRate}%\``, inline: true},
					
					{ name: '\u200B', value: '\u200B', inline: true }, // Blank space
					{ name: `Stats`, value: `HP: \`${cock['hp']}\` \nATTACK: \`${cock['attack']}\` \nDEFENSE: \`${cock['defense']}\` \nSPEED: \`${cock['speed']}\``, inline: true },
					
				)
				.setThumbnail(cocks['images'][cock['race']])
				.setFooter({ text: `Versão ${ee.version}` })
				.setColor(ee.color);
			message.channel.send({ embeds: [embed] });

		};
	}
};

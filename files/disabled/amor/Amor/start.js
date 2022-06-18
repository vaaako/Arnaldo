const sqlite = require('sqlite')
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');

const { capitalize, titleCase, clearSpaces } = require('../../files/scripts/text-formatting.js');
const { writeFile } = require('../..files/scripts/functions.js');
const { 
	amor_db, 
	amor_json, 
	getRarity, 
	addDefaultItems,
	getObj, 
	getMarriage 
} = require('../../files/scripts/amor-functions.js');
const diseaseJson = require('../../files/database/amor/statics/diseases.json');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');


module.exports = {
	name: "start",
	category: "Amor",
	aliases: ["create", "register"],
	usage: "start <nome> + <motivação>",
	description: "Cria um personagem no RP do Arnaldo",
	run: async (client, message, args) => {
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		
		var info = args.slice(0).join(' '); // Botar array em string
		var info = info.split("+"); // Colocar string em array separado por +
	
		const id = message.author.id;
		const age = Math.floor(Math.random() * (69 - 12 + 1)) + 12; // 12 - 69

		let rows = await db.all(`SELECT * FROM "world" WHERE "id"='${id}';`);
		if(rows!='') 
			return message.channel.send("Desculpe, um personagem por usuário");

		// NAME
		var name = titleCase(info[0]);
		if(!name) return message.reply("Esqueceu de nomear seu personagem");
		if(name.length>30) return message.channel.send("Pense em um nome menor");
		name = name.trim();

		// MOTIVATION
		var motivation = capitalize(info[1]);
		if(!motivation) return message.reply("Você precisa de uma motivação");
		if(motivation.length>50) return message.reply("Essa motivação é enorme, resume um pouco");
		motivation = motivation.trim();

		// GENDER
		let msg = await message.reply(`Escolha um gênero para \`${name}\``);
		msg.react('♂️');
		msg.react('♀️');
		msg.react('❌');

		
		const filter = (reaction, user) => {
			return (reaction.emoji.name === '♂️' || reaction.emoji.name === '♀️' || reaction.emoji.name === '❌') && user.id == message.author.id;
		};

		const collector = msg.createReactionCollector({ filter, time: 10000, max: 1 });
		collector.on('collect', (reaction, user) => {

			const react = reaction.emoji.name;

			if(react==='♂️')
				var gender = "Macho ♂️";

			if(react==='♀️')
				var gender = "Muie ♀️";

			if(react==='❌') 
				return message.channel.send("Sem gênero definido para o seu personagem, registro cancelado");

			const rarity = getRarity();
			const disease = getObj(diseaseJson, rarity);
			const marriage = getMarriage();

			db.run(`INSERT INTO world ("id", "name", "age", "gender", "motivation", "disease", "rarity", "marriage") VALUES ('${id}', '${name}', '${age}', '${gender}', '${motivation}', '${disease}', '${rarity}', '${marriage}');`);
			db.close();

			/**
			 * @Json
			 */
			let data = fs.readFileSync(amor_json, 'utf-8');
			let obj = JSON.parse(data);
			
			addDefaultItems(obj, id);

			let json = JSON.stringify(obj, null, 1);
			writeFile(amor_json, json);
			/**
			 * @EndJson
			 */

			let embed = new MessageEmbed()
				.setTitle(`${name} \n${gender}`)
				.setDescription(`\`${age}\` **Anos** \n**Doença:** \`${disease}\` \`(${rarity})\` \n**Casamento:** \`${marriage}\` \n**Motivação:**  \`${motivation}\` \n\n**Filhos:** \`0\` \n**RR$** \`0.00\``)
				.setColor(ee.color)
				.setFooter({ text: `Versão ${ee.version}` });
			message.channel.send({ embeds: [embed] });

		}); // Fim do collector

		collector.on('end', collected => {
			if(collected.size.length==0) {
				return message.channel.send("Sem gênero definido para o seu personagem, registro cancelado");
			}
		});


	}
};

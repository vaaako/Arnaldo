const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');

const { 
	amor_db, 
	amor_json, 
	checkUser, 
	findKey 
} = require('../../files/scripts/amor-functions.js');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "inv",
	category: "Info",
	aliases: ["inventario", "mochila"],
	usage: "inv",
	description: "Seu inventário",
	run: async (client, message) => {
		// Check
		const db = await sqlite.open({ filename: amor_db, driver: sqlite3.Database });
		const id = message.author.id;
		let rows = await db.all(`SELECT name FROM "world" WHERE "id"='${id}';`);
		if(!checkUser(message, rows))
			return;
		// EndCheck

		let data = fs.readFileSync(amor_json, 'utf-8');
		let obj = JSON.parse(data);
				
		const item = obj[id];
		if(!findKey(obj, id))
			return message.channel.send("Compre um item antes, por questões técnicas chatas demais pra eu explicar");

		let embed = new MessageEmbed()
			.setTitle(`${rows[0]['name']} \nInventário`)
			.setDescription(`**Arma: ** \`${item['arma']}\` \n**Chicote: ** \`${item['chicote']}\` \n**Djamba: ** \`${item['djamba']}\` \n**Pinga: ** \`${item['pinga']}\` \n**Viagra: ** \`${item['viagra']}\` \n**Whey: ** \`${item['whey']}\``)
			.setColor(ee.color);
		return message.channel.send({ embeds: [embed] });
	}
};

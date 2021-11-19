const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message) => {

	// Math.floor(Math.random() * 10) + 1; // 1 - 10
	// Math.floor(Math.random() * 11); // 0 - 11
	let num = Math.floor(Math.random() * 2) + 1;

	if(num == 1) {
		await message.react('😀')

	} else {
		await message.react('👑')

	}

};

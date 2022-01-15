const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message) => {

	// Math.floor(Math.random() * 10) + 1; // 1 - 10
	// Math.floor(Math.random() * 11); // 0 - 11
	let num = Math.floor(Math.random() * 100000)

  let embed = new Discord.MessageEmbed()
		// .setTitle("\n")
    .setDescription(`${message.author}` + " Você tirou: `" + num + "`")
		.setColor(color)
	await message.channel.send(embed);

};
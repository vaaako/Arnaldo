const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message) => {
  
	let link = Math.floor(Math.random() * 371990 + 1) // 1 - num

  let embed = new Discord.MessageEmbed()
    .setTitle("Divirta-se :smiley: (ou não)")
		.setDescription(`https://nhentai.net/g/${link}`)
		.setColor(color)
	await message.channel.send(embed);

};

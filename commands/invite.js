const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message) => {

	var embed = new Discord.MessageEmbed()
		.setAuthor("Arnaldo#6030", "https://cdn.discordapp.com/avatars/832998059334959134/3dd9b8a78fd058c6ab7e4fe8a6999164.webp?size=1024", "https://discord.com/oauth2/authorize?client_id=832998059334959134&permissions=1077242945&scope=bot")			
		.setTitle("Vai mesmo fazer isso?")
		.setDescription("Se quiser mesmo, use esse [link](https://discord.com/oauth2/authorize?client_id=832998059334959134&permissions=1077242945&scope=bot)")
	return message.channel.send(embed);
}
const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message) => {

  let embed = new Discord.MessageEmbed()
		.setAuthor("Arnaldo#6030", "https://cdn.discordapp.com/avatars/832998059334959134/3dd9b8a78fd058c6ab7e4fe8a6999164.webp?size=1024", "https://discord.com/oauth2/authorize?client_id=832998059334959134&permissions=8&scope=bot")
		.setTitle("\n")
    .setDescription("Bom oque posso dizer? Meu nome é **Arnaldo** eu nasci no dia 17 de abril de 2021, meu pai é o **[Vako]** e minha mãe é o **Shy Girl**.")
		.setColor(color)
	await message.channel.send(embed);

};
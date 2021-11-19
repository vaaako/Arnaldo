const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message, args) => {
  const search = args.join('+');
	link = `https://duckduckgo.com/?q=!ducky+${search}%3Asiteurl`

	if(!search) {
		return message.channel.send("Você precisa digitar algo para que eu possa fazer a pesquisa")
	}

  let embed = new Discord.MessageEmbed()
    .setTitle("\n")
		.setDescription(`Eu achei este [resultado](${link}) para sua pesquisa.`)
		// .setFooter("Lembre-se que esse link redicionará para um site.")
		.setColor(color)
	await message.channel.send(embed);


};

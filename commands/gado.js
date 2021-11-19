const Discord = require('discord.js');
color = 0xDA1354

module.exports.run = async (client, message, args) => {
  
	let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || "Você"; // se não mencionar ninguem vai ser igual "Você"

	let rand = Math.floor(Math.random() * 101) // 0 - 100
	// let rand = 100

  let embed = new Discord.MessageEmbed()
    .setTitle("Detector de gado")
		.setDescription(`${member} é \`${rand}%\` gado :ox:`)
		.setColor(color)

	if(rand>=90){
		embed.addField("\n", "Parece que encontramos o **Rei do Gado!**")

		message.channel.send("https://www.youtube.com/watch?v=XGyzPEdavEY")
		return message.channel.send(embed);
		
	}
	return message.channel.send(embed);
	

};

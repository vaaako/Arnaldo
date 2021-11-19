const Discord = require('discord.js');
color = 0xDA1354

module.exports.run = async(client, message, args) => {
  
	let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || "Você"; // se não mencionar ninguem vai ser igual "Você"
	let rand = Math.floor(Math.random() * 101) // 0 - 100
	// let rand = 24;

  let embed = new Discord.MessageEmbed()
    .setTitle("Detector de gay :gay_pride_flag:")
		.setDescription(`${member} é \`${rand}%\` gay :gay_pride_flag:`)
		.setColor(color)

	if(rand==24) {
		embed.addField("Párabens", "Você é o **Gay MASTER!** 🏳️‍🌈")
	}
	await message.channel.send(embed);


};

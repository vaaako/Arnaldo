const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async(client, message, args) => {
	

	var embed = new Discord.MessageEmbed()
		.setTitle("\n")
		.setDescription("Você não está em um canal de voz bobão!")
		.setColor(color)

	if(!message.member.voice.channel) return message.channel.send(embed)
	
	const music = args.join(" ");
	if(!music) {
		var embed = new Discord.MessageEmbed()
			.setTitle("\n")
			.setDescription("Esqueceu de escrever oque é para eu tocar!")
			.setColor(color)
    return message.channel.send(embed)
  }

	client.distube.play(message, music)

};

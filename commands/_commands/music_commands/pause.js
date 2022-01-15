const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message) => {
	var embed = new Discord.MessageEmbed()
		.setTitle("\n")
		.setDescription("Você não está em um canal de voz bobão!")
		.setColor(color)
	if (!message.member.voice.channel) return message.channel.send(embed)

	if(client.distube.isPaused(message)) return // se ja esta pausado


	let queue = await client.distube.getQueue(message);

	var embed = new Discord.MessageEmbed()
		.setTitle("\n")
		.setDescription("Pausado :pause_button:")
		.setColor(color)



	if(queue) {
		client.distube.pause(message)		
		message.channel.send(embed)

	} else if (!queue) {
		var embed = new Discord.MessageEmbed()
			.setTitle("\n")
			.setDescription("Sem músicas para pausar")
			.setColor(color)	
		return message.channel.send(embed)
	};
}

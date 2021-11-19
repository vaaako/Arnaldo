const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async(client, message) => {

	const queue = client.distube.getQueue(message)

	var embed = new Discord.MessageEmbed()
		.setTitle("\n")
		.setDescription("Sem músicas na lista")
		.setColor(color)
	if(!queue) return message.channel.send(embed)

	var embed = new Discord.MessageEmbed()
		.setTitle("\n")
		.setDescription("Sem músicas tocando")
		.setColor(color)
	if(!queue && !client.distube.isPlaying(message)) return message.channel.send(embed)

	const song = queue.songs[0]

	var embed = new Discord.MessageEmbed()
		.setTitle("Tocando agora")
		.setDescription(`[${song.name}](${song.url})`)
		// .addField("Canal", song.channel, true)
		.addField("Duração da música", song.formattedDuration, true)
		.addField("Requested By", song.user, true)
		.setThumbnail(song.thumbnail)
		.setColor(color)

	message.channel.send(embed)
};

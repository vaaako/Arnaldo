const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message) => {
	// if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');

	let queue = await client.distube.getQueue(message);

	if(queue) {
		var embed = new Discord.MessageEmbed()
			.setTitle("**:musical_note: ⁓ Current queue**")
			.setDescription(queue.songs.map((song, id) => `**${id + 1}**. \`${song.name}\` - ${song.formattedDuration}`).slice(0, 10).join("\n"))
			.setColor(color)	
		return message.channel.send(embed)

			// message.channel.send(` \n` +);

	} else if (!queue) {
		var embed = new Discord.MessageEmbed()
			.setTitle("\n")
			.setDescription("Sem músicas")
			.setColor(color)	
		return message.channel.send(embed)
	};
}
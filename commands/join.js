const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message) => {
	
  const voice_channel = message.member.voice.channel;
  if (!voice_channel) {
		let embed = new Discord.MessageEmbed()
			.setTitle("Você não está em um canal de voz")
			.setColor(color)
		return await message.channel.send(embed);
	}

	await voice_channel.join()

};

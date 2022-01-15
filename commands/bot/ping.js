const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async(client, message) => {
  // const m = await message.channel.send('Pong :ping_pong:');
	let embed = new Discord.MessageEmbed()
		.setTitle("\n")
		.setDescription('Pong :ping_pong:')
		.setColor(color)
	const m = await message.channel.send(embed)
	
	let embedF = new Discord.MessageEmbed()
    .setTitle("🏓 | Pong!")
		.addField("Latência do Bot", Math.round(client.ws.ping) + "ms", false)
		.addField("API", m.createdTimestamp - message.createdTimestamp + "ms", false)
		.setColor(color)
	await m.edit(embedF);

};

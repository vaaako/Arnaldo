const Discord = require('discord.js');

color = 0xDA1354

let vako_shy = ["703785252463837234", "602303260572778516", "876286395348561951"]
module.exports.run = async (client, message, args) => {
  
  // if(!vako_shy.includes(message.author.id)) return message.reply("Não")

	if (!message.member.permissions.has("MANAGE_MESSAGES"))
		return message.channel.send("Você não possui a permissão necessária para usar esse comando.");

	let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	m = args.slice(1).join(" ")

	if(!member) {
	let embed = new Discord.MessageEmbed()
		.setTitle("Mencione alguem para que eu possa mandari um oi")
		.setColor(color)
	return await message.channel.send(embed);
	}

	if (!m) {
		let embed = new Discord.MessageEmbed()
			.setTitle("Mas oque que eu vou falar?")
			.setColor(color)
		return await message.channel.send(embed);
	}

	await message.delete()
	await member.send(m)

};

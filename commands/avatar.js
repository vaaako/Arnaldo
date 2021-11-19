const Discord = require('discord.js'); // Import
color = 0xDA1354

exports.run = async (client, message, args) => {

	let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author; // se nao tiver mencionado é o avatar do autor
  
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

  let embed = new Discord.MessageEmbed()
    .setAuthor(`• Avatar de ${user.username}`, `${user.displayAvatarURL({format: "png"})}`)
    .setImage(avatar)
		.setColor(color)
    // .setFooter(`• Avatar de: ${user.username}`, user.displayAvatarURL({format: "png"}));
	await message.channel.send(embed);

};

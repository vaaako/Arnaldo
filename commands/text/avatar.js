const { MessageEmbed } = require('discord.js'); // Import
const { getUser } = require('../../files/utils/getUser.js')

module.exports.run = async (client, message, args) => {
  
	var user = await client.users.fetch(args[0]).catch(() => null) || getUser(client, message, args[0]) || message.author;

  const avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
  let embed = new MessageEmbed()
    .setAuthor(`• Avatar de ${user.username}`, `${user.displayAvatarURL({format: "png"})}`)
    .setImage(avatar)
		.setColor("0xDA1354")
	return message.channel.send(embed);

};

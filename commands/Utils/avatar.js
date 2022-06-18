const { langHandler } = require('../../files/translations/langHandler.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "avatar",
	category: "Utils",
	aliases: ["foto", "photo"],
	usage: "avatar [user]",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).info.avatar;

		let user = message.mentions.users.first() || message.author;
		const avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })

		let embed = new MessageEmbed()
			.setAuthor({ name: `${LANGUAGE.EMBED.author} ${user.username}` })
			.setImage(avatar)
			.setColor(ee.color);
		return message.channel.send({ embeds: [embed] });
	}
};


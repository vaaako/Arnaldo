const { langHandler } = require('../../files/translations/langHandler.js');

const { MessageEmbed } = require('discord.js');
const { getUser } = require('../../files/scripts/functions.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "avatar",
	category: "Info",
	aliases: ["foto", "photo"],
	usage: "avatar [user]",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).info.avatar;

		let user = getUser(client, args[0]) || message.author;
		const avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 })
			.catch(() => message.reply(LANGUAGE.noAvatar));

		let embed = new MessageEmbed()
			.setAuthor({ name: `${LANGUAGE.EMBED.title} ${user.username}` })
			.setImage(avatar)
			.setColor(ee.color);
		return message.channel.send({ embeds: [embed] });
	}
};


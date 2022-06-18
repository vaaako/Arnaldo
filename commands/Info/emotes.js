const { langHandler } = require('../../files/translations/langHandler.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

function getEmoji(client, id) {
	return client.emojis.cache.get(id).toString();
};

module.exports = {
	name: "emotes",
	category: "Info",
	aliases: ["emoji", "emojis", "emote"],
	usage: "emojis",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).info.emotes;

		let normal = "";
		let normalCount = 0;
		
		let animados = "";
		let animadosCount = 0;

		let emojisTotal = 0;


		message.guild.emojis.cache.forEach((emoji) => {
			emojisTotal++;
			if(emoji.animated) {
				animadosCount++;
				animados += getEmoji(client, emoji.id);
			} else {
				normalCount++;
				normal += getEmoji(client, emoji.id);
			};
		});

		let embed = new MessageEmbed()
			.setAuthor({ name: `${LANGUAGE.EMBED.author} ${message.guild.name}`, icon_url: [message.guild.iconURL()] })
			.setDescription(`
			**${LANGUAGE.EMBED.DESCRIPTION.default} [${normalCount}]**\n${normal}\n
			**${LANGUAGE.EMBED.DESCRIPTION.animated} [${animadosCount}]**\n${animados}\n`)

			.setFooter({ text: `${LANGUAGE.EMBED.footer} [${emojisTotal}]` })
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
	}
};

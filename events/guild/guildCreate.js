const { langHandler } = require('../../files/translations/langHandler.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

const { prefix } = require("../../config/config.js");
const dev = require("../../files/database/statics/dev.json")

module.exports = async (client, guild) => {
	const LANGUAGE = langHandler(false, guild).guildCreate;

	var defaultChannel;
	let channels = guild.channels.cache;

	for(const channel of channels.values()) {
		if(channel.type=="GUILD_TEXT") {
			defaultChannel = channel;
			break;
		} else { continue; }
	}
	let channel = (guild.systemChannel) ? guild.systemChannel : defaultChannel;

	let embed = new MessageEmbed()
		.setTitle(LANGUAGE.EMBED.title)
		.setDescription(LANGUAGE.EMBED.description.replaceAll('$PREFIX', prefix))
		.setColor(ee.color)
		.setTimestamp();
	channel.send({ embeds: [embed] });

	// For me
	return client.channels.cache.get(dev['event-channel'])
		.send(`Ebaaaa \nFui adicionado no servidor **${guild.name}** (\`${guild.id}\`)`);

};



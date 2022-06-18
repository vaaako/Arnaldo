const { langHandler } = require('../../files/translations/langHandler.js');
const fs = require('fs');

module.exports = {
	name: "announcement",
	category: "Bot",
	aliases: ["anuncio", "anun", "announcement", "announ"],
	usage: "announcement [channel-id]",
	adminOnly: true,
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).bot.announcement;

		// Getting json
		let obj = JSON.parse(fs.readFileSync('files/database/servers.json', 'utf-8'));
		const guildId = message.guild.id // Server ID

		// Getting channel
		let channel = args[0];
		if(!channel) {
			if(obj[guildId] && obj[guildId]['announcement-channel'])
				return message.reply(`${LANGUAGE.seeChannel} <#${obj[guildId]['announcement-channel']}>`)
			else
				return message.reply(LANGUAGE.noChannel);
		}

		channel = channel.replace(/[<#>]/g, '')
		if(!message.guild.channels.cache.find(c => c.id === channel)) // Veryfing
			return message.reply(LANGUAGE.noChannel);

		if(!obj[guildId])
			obj[guildId] = { "announcement-channel": channel, "universal-chat": null}; // Adding both
		else
			obj[guildId]['announcement-channel'] = channel // Adding channel only
		
		fs.writeFileSync('files/database/servers.json', JSON.stringify(obj, null, 1)); // Saving
		message.reply(`<#${channel}> ${LANGUAGE.set}`);

	}
};
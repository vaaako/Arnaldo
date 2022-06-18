const fs = require('fs');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

const { findKey } = require('../../files/scripts/functions.js');
const { titleCase } = require('../../files/scripts/text-formatting.js');

const translate = require('@vitalets/google-translate-api'); // Translate announcement

async function translateThis(text, lang) {
	let res = translate(text, { to: lang }).then((res) => {
		return res.text; // The function return
	})
	return await res; // Returning the res.text
}


function sendFirstChannel(guild, msg) {
	var defaultChannel;
	let channels = guild.channels.cache;

	for(const channel of channels.values()) {
		if(channel.type == "GUILD_TEXT") {
			defaultChannel = channel;
			break;
		} else { continue; }
	}

	let channel = (guild.systemChannel) ? guild.systemChannel : defaultChannel;
	channel.send(msg);
}

module.exports = {
	name: "make-anun",
	category: "",
	aliases: [],
	usage: "make-anun <title> + <description>",
	whitelistOnly: true,
	run: async (client, message, args) => {
		const info = args.slice(0).join(' ').split("+"); // Colocar string em array separado por +
		
		const TITLE = titleCase(info[0]);
		const DESCRIPTION = info[1];

		if(!TITLE)
			return message.channel.send("Não pode ficar sem título");
		if(!DESCRIPTION)
			return message.channel.send("Não pode ficar sem descrição");
		
		// Getting json
		let data = fs.readFileSync('files/database/servers.json', 'utf-8');
		var obj = JSON.parse(data);

		// All servers
		client.guilds.cache.forEach(async (guild) => {
			const { langHandler } = require('../../files/translations/langHandler.js');
			const lang = langHandler(false, guild).language;

			let embed = new MessageEmbed() // Tranlate to each guild language
				.setTitle(await translateThis(TITLE, lang))
				.setDescription(await translateThis(DESCRIPTION, lang))
				.setTimestamp()
				.setColor(ee.color);

			let guildId = guild.id;
			console.log(guildId)

			if(!findKey(obj, guildId))
				sendFirstChannel(guild, { embeds: [embed] });
			else
				client.channels.cache.get(obj[guildId]['announcement-channel']).send({ embeds: [embed] })
				.catch(() => console.log(`ANUN: This channel don't exist anymore \nC: ${obj[guildId]['announcement-channel']} (S: ${guildId})`));
		});
	}
};

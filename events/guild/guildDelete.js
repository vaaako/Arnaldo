const fs = require('fs');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

const dev = require("../../files/database/statics/dev.json")

module.exports = async (client, guild) => {
	// Getting json
	let obj = JSON.parse(fs.readFileSync('files/database/servers.json', 'utf-8'));

	delete obj[guild.id]

	fs.writeFileSync('files/database/servers.json', JSON.stringify(obj, null, 1)); // Saving

	return client.channels.cache.get(dev['event-channel'])
		.send(`Me tiraram do servidor **${guild.name}** (\`${guild.id}\`) :(`);
};



const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "delete",
	category: "",
	aliases: [],
	usage: "delete <id>",
	whitelistOnly: true,
	run: async (client, message, args) => {
		message.channel.messages.fetch(args[0]).then((m) => {
			m.delete();
			message.delete();
		})
	}
};

// NÃO TESTADO para 2.0
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "dmdel",
	category: "",
	aliases: [],
	usage: "dmdel <id>",
	description: "Não vou contar",
	whitelistOnly: true,
	run: async (client, message, args) => {
		if(!args[0])
			return;

		const User = client.users.cache.get(message.channel.id); // Your Discord ID.
		const MessageId = args[0]; // The ID of the message you want to delete.

		User.dmChannel.messages.fetch(MessageId)
			.then((m) => m.delete())
			.catch((err) => {
				message.reply(`${ee.error} \`\`\`${err.message}\`\`\``);
			});
	}
};

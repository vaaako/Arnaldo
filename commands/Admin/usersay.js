module.exports = {
	name: "usersay",
	category: "",
	aliases: [],
	usage: "usersay <text>",
	whitelistOnly: true,
	run: async (client, message, args) => {
		const msg = args.join(" ");
		if(!args[0]) return message.channel.send("Nothing to say!");

		message.channel.createWebhook(message.author.username, {avatar: message.author.avatarURL()})
		.then((webhook) => {
			message.delete();
			webhook.send(msg).then(() => {
				webhook.delete();
			});
		})
	}
};

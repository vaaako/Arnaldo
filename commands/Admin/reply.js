module.exports = {
	name: "reply",
	category: "",
	aliases: [],
	usage: "reply <id> <message>",
	whitelistOnly: true,
	run: async (client, message, args) => {
		const id = args[0];
		const msg = args.slice(1).join(" ");

		if(!id[0] || !msg)
			return message.delete();

		message.channel.messages.fetch(args[0]).then((m) => {
			message.delete();
			m.reply(msg);
		}).catch(() => console.log("Erro -> Delete message [Ignore]"));
		
	}
};

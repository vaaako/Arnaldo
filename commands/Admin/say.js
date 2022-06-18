module.exports = {
	name: "say",
	category: "",
	aliases: [],
	usage: "say <message>",
	whitelistOnly: true,
	run: async (client, message, args) => {
		const msg = args.join(" ");
		if(!args[0])
			return message.delete();

		message.delete().then(() => {
			message.channel.send(msg)
		}).catch(() => console.log("Erro -> Delete message [Ignore]"));
		
	}
};

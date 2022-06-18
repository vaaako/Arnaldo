module.exports = {
	name: "ping",
	category: "Bot",
	aliases: ["latency"],
	usage: "ping",
	run: async (client, message) => {
		message.channel.send("Pinging....").then((msg) => {
			msg.edit(`🏓 Pong! \nAPI: \`${ Math.round(client.ws.ping)}\`ms \nBot: \`${msg.createdAt - message.createdAt }\`ms.`);
		}).catch(() => console.log("Erro -> Delete message [Ignore]"));
	}
};

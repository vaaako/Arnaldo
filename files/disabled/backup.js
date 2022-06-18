module.exports = {
	name: "backup",
	category: "",
	aliases: [],
	usage: "None",
	description: "None",
	whitelistOnly: true,
	run: async (client, message) => {
		message.channel.send({
			files: [
				'files/database/amor/world.json',
				'files/database/amor/world.db'
			],
			content: `Pindamonhangaba.`
		}).catch((err) => { message.channel.send(`Houve um erro ao executar este comando \n${err.stack}`)  });
	}
};

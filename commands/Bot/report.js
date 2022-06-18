const { langHandler } = require('../../files/translations/langHandler.js');

module.exports = {
	name: "report",
	category: "Bot",
	aliases: ["bug", "helpme"],
	usage: "report <message>",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).bot.report;

		const msg = args.join(" ");
		if(!msg)
			return message.reply(LANGUAGE.noReport);

		client.users.cache.get('703785252463837234').send(msg).then(() => { 
			message.reply(LANGUAGE.sent);
		});
	}
};

const { langHandler } = require('../../files/translations/langHandler.js');

module.exports = {
	name: "sorteio",
	category: "Text",
	aliases: ["candice"],
	usage: "sorteio",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).text.sorteio;
		message.reply(LANGUAGE.reply);
	}
};

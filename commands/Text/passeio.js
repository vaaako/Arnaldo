const { langHandler } = require('../../files/translations/langHandler.js');

module.exports = {
	name: "passeio",
	category: "Text",
	aliases: ["penny"],
	usage: "passeio",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).text.passeio;
		message.reply(LANGUAGE.reply);

	}
};

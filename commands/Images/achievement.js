const { langHandler } = require('../../files/translations/langHandler.js');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args));

module.exports = {
	name: "achievement",
	category: "Images",
	aliases: ["ach", "conquista", "conq"],
	usage: "achievement <message>",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).images.achievement;
		let string = args.join('..') || LANGUAGE.default;

		if(string.length>25)
			return message.reply(LANGUAGE.tooLong);

		const res = await fetch(`https://minecraft-api.com/api/achivements/bedrock/Achievement..Get/${string}`);
		return message.reply(res.url);
	}
};

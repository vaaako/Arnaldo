const { langHandler } = require('../../files/translations/langHandler.js');
const langs = require('../../files/database/statics/language.json');
const translate = require('@vitalets/google-translate-api');

module.exports = {
	name: "translate",
	category: "Utils",
	aliases: ["trans", "traduzir", "trad"],
	usage: "translate [language] <text>",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).utils.translate;
		const langsKeys = Object.keys(langs);

		if(!args.join(' ') || !args[1]) // If don't have nothing
			return message.reply(LANGUAGE.noText)

		var lang = args[0];
		if(!Object.keys(langs).includes(args[0])) { // If isn't any language key
			var lang = "auto";
			var text = args.join(' '); // If is auto tranlate
		} else {
			var text = args.splice(1).join(' ');
		}


		translate(text, { to:  lang }).then(res => {
			message.reply(`${LANGUAGE.translation.replace("$FROM", langs[res.from.language.iso]).replace("$TO",  langs[lang])} **►** \`${res.text}\``);
		})
	}
};

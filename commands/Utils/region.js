const { langHandler } = require('../../files/translations/langHandler.js');

module.exports = {
	name: "region",
	category: "",
	aliases: ["reg"],
	usage: "region [\"change\"]",
	adminOnly: true,
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).utils.region;

		if(!args[0] || args[0]!="change")
			message.channel.send(LANGUAGE.noReg.replace("$REGION", langHandler(message).language));

		else if(args[0].toLowerCase() == "change") {
			let guild = message.guild;

			if(guild.preferredLocale=="en-US") {
				message.guild.setPreferredLocale('pt-BR'); // Change
				return message.reply('Linguagem mudada');
				
			} else {
				message.guild.setPreferredLocale('en-US');
				return message.reply('Language changed');
			}
		}

	}
};

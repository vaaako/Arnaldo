const { langHandler } = require('../../files/translations/langHandler.js');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');
const { capitalize } = require('../../files/scripts/text-formatting.js');

module.exports = {
	name: "ask",
	category: "Fun",
	aliases: ["pergunta", "perguntar", "question"],
	usage: "ask <question>",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).fun.ask;
		let answers = LANGUAGE.answers; // Importing answers

		var rand = answers[Math.floor(Math.random() * answers.length)];
		const question = args.join(' ');
	
		if(!question) 
			return message.reply(LANGUAGE.noQuestion);
		if(question.toLowerCase().includes("hotel")) 
			rand = "Trivago";

		let embed = new MessageEmbed()
			.setTitle(capitalize(question))
			.setDescription(rand)
			.setColor(ee.color);
		
		message.channel.send("Hmm...").then((sent) => {
			setTimeout(() => {
				sent.delete();
				message.reply({ embeds: [embed] });
			}, 5000);
		}).catch(() => console.log("Erro -> Delete message [Ignore]"));
	}
};

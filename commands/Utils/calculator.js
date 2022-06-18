const { langHandler } = require('../../files/translations/langHandler.js');

module.exports = {
	name: "calculator",
	category: "Utils",
	aliases: ["calcular", "calc"],
	usage: "calc <operation>",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).utils.calc;

		var op = args.join(' ');
		if(!op) 
			return message.reply(LANGUAGE.noOperation);
		op = op.toLowerCase()
			.replace("x", "*").replace("÷", "/");

		message.reply(`${LANGUAGE.result} \`${eval(op)}\``).catch(() => {
			return message.reply(LANGUAGE.invalid)
			.then((sent) => {
				setTimeout(() => {
					sent.delete();
				}, 5000);
			}).catch(() => console.log("Erro -> Delete message [Ignore]"));
		});
	}
};

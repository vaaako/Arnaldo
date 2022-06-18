const { langHandler } = require('../../files/translations/langHandler.js');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');
const { prefix } = require('../../config/config.js');

// Somar itens do array
function add(accumulator, a) {
	return accumulator + a;
};

module.exports = {
	name: "roll",
	category: "Fun",
	aliases: ["dado", "dice"],
	usage: "roll [vezes]d<dado>",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).fun.roll;
		var rollsArray = [];

		if(!args[0])
			return message.reply(LANGUAGE.noArgs);

		// [rolls]D[sides]
		// [0]D[1]
		let values = args[0].split('d');

		var rolls, sides;
		if(!values[0] || values.length==1) {
			rolls = 1;
			sides = values[0] || values[1];
		} else {
			rolls = values[0];
			sides = values[1];
		}
 
		if(!sides || sides <= 0)
			return message.reply(LANGUAGE.noSides.replace('$PREFIX', prefix));

		if(isNaN(rolls) || isNaN(sides))
			return message.reply(LANGUAGE.isNaN);

		if(rolls > 999 || sides > 999)
			return message.reply(LANGUAGE.tooBig);


		for(let i = 0; i < rolls; i++)
			rollsArray.push(Math.floor(Math.random() * sides) + 1);

		var sum = rollsArray.reduce(add, 0); // somando itens do array

		let embed = new MessageEmbed()
			.setTitle(`${LANGUAGE.EMBED.title} \`${sum}\``)
			.addField("Rolls", `[${ rollsArray.sort(function(a, b) {return a - b}).join(", ") }]`, false)
			.setThumbnail('https://s3.amazonaws.com/images.ecwid.com/images/7771588/946830785.jpg')
			.setColor(ee.color);
		message.reply({ embeds: [embed] });
	}
};

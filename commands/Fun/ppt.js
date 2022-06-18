// Odeio esse código
// Fazer com código avançado de PPT
const { langHandler } = require('../../files/translations/langHandler.js');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "ppt",
	category: "Fun",
	aliases: ["rps", "jkp"],
	usage: "ppt",
	run: async (client, message) => {
		const LANGUAGE = langHandler(message).fun.ppt;
		const PPT = ['🪨', '📄', '✂️']; // escolhas do bot

		var bot_choice = PPT[Math.floor(Math.random() * PPT.length)]; // escolha do bot

		message.react('🪨');
		message.react('📄');
		message.react('✂️');
		
		const filter = (reaction, user) => {
			return (reaction.emoji.name === '🪨' || reaction.emoji.name === '📄' || reaction.emoji.name === '✂️') && user.id === message.author.id;
		};

		const collector = message.createReactionCollector({ filter, time: 7000, max: 1 });

		collector.on('collect', (reaction, user) => {
			let title = `${reaction.emoji.name} X ${bot_choice}`;

			let embedWIN = new MessageEmbed().setTitle(title).setDescription(LANGUAGE.EMBED.DESCRIPTION.win).setColor(ee.color);
			let embedLOSE = new MessageEmbed().setTitle(title).setDescription(LANGUAGE.EMBED.DESCRIPTION.lose).setColor(ee.color);
			let embedDRAW = new MessageEmbed().setTitle(title).setDescription(LANGUAGE.EMBED.DESCRIPTION.draw).setColor(ee.color);
	
			// Se escolha do jogar for a mesma do bot
			if(reaction.emoji.name === bot_choice) return message.channel.send({ embeds: [embedDRAW] })

			if(reaction.emoji.name === '🪨') {
				if(bot_choice === '✂️') {
					return message.channel.send({ embeds: [embedWIN] })
	
				} else if(bot_choice === '📄') {
					return message.channel.send({ embeds: [embedLOSE] })

				};
			};
			
			if(reaction.emoji.name === '📄') {
				if(bot_choice === '🪨') {
					return message.channel.send({ embeds: [embedWIN] })
	
				} else if(bot_choice === '✂️') {
					return message.channel.send({ embeds: [embedLOSE] })

				};
			};
	
			if(reaction.emoji.name === '✂️'){
				if(bot_choice === '📄') {
					return message.channel.send({ embeds: [embedWIN] })
	
				} else if(bot_choice === '🪨') {
					return message.channel.send({ embeds: [embedLOSE] })
				};
			};

		}); // Fim do collector

	}
};
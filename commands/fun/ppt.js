const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message) => {

	const PPT = ['🪨', '📄', '✂️']; // escolhas do bot

	var bot_choice = PPT[Math.floor(Math.random() * PPT.length)]; // escolha do bot

	message.react('🪨');
	message.react('📄');
	message.react('✂️');
	
	message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '🪨' || reaction.emoji.name == '📄' || reaction.emoji.name == '✂️'), 
		{ max: 1, time: 10000 }).then(collected => { // esperando por reações

		let title = `${collected.first().emoji.name} X ${bot_choice}`;

		let embedWIN = new MessageEmbed().setTitle(title).setDescription("Você `ganhou`! :partying_face:").setColor('0xDA1354');
		let embedLOSE = new MessageEmbed().setTitle(title).setDescription("Você `perdeu`! :)").setColor('0xDA1354');
		let embedDRAW = new MessageEmbed().setTitle(title).setDescription("Deu `Empate`!").setColor('0xDA1354');

		// Se escolha do jogar for a mesma do bot
		if(collected.fist().emoji.name === bot_choice) return message.channel.send(embedDRAW);

		if(collected.first().emoji.name === '🪨') {
			if(bot_choice === '✂️') {
				return message.channel.send(embedWIN);

			} else if(bot_choice === '📄') {
				return message.channel.send(embedLOSE);
			};
		};
		
		if(collected.first().emoji.name === '📄') {
			if(bot_choice === '🪨') {
				return message.channel.send(embedWIN);

			} else if(bot_choice === '✂️') {
				return message.channel.send(embedLOSE);
			};
		};

		if (collected.first().emoji.name === '✂️'){
			if(bot_choice === '📄') {
				return message.channel.send(embedWIN);

			} else if(bot_choice === '🪨') {
				return message.channel.send(embedLOSE);
			};
		};

	});
};

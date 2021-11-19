const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message) => {

	PPT = ['🪨', '📄', '✂️'] // escolhas do bot

	var bot_choice = PPT[Math.floor(Math.random() * PPT.length)]; // escolha do bot

	message.react('🪨').then(r => { // adicionando reações
		message.react('📄'), message.react('✂️');
	});

	message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '🪨' || reaction.emoji.name == '📄' || reaction.emoji.name == '✂️'), 
		{ max: 1, time: 30000 }).then(collected => { // esperando por reações

		let title = `${collected.first().emoji.name} X ${bot_choice}`;

		let embedWIN = new Discord.MessageEmbed().setTitle(title).setDescription("Você `ganhou`! :partying_face:").setColor(color)
		
		let embedLOSE = new Discord.MessageEmbed().setTitle(title).setDescription("Você `perdeu`! :)").setColor(color)
		
		let embedDRAW = new Discord.MessageEmbed().setTitle(title).setDescription("Deu `Empate`!").setColor(color)

		if(collected.first().emoji.name === '🪨') {
			if(bot_choice === '✂️') {
				message.channel.send(embedWIN);

			} else	if(bot_choice === '📄') {
				message.channel.send(embedLOSE);

			} else {
				message.channel.send(embedDRAW);
			}
		} 
		
		if(collected.first().emoji.name === '📄') {
			if(bot_choice === '🪨') {
				message.channel.send(embedWIN);

			} else	if(bot_choice === '✂️') {
				message.channel.send(embedLOSE);

			} else {
				message.channel.send(embedDRAW);
			}
		} 

		if (collected.first().emoji.name === '✂️'){
			if(bot_choice === '📄') {
				message.channel.send(embedWIN);

			} else	if(bot_choice === '🪨') {
				message.channel.send(embedLOSE);

			} else {
				message.channel.send(embedDRAW);
			}
		}

	})
};

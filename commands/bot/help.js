const { MessageEmbed } = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message, args) => {

	var prefix = require('../../config.json');
	prefix = prefix.prefix;
	
  const ajuda = args.join(' ');

	if(!ajuda) {
		var embed = new MessageEmbed()	
			.setTitle("Tópicos de comandos")
			.addField(prefix + "help text", "Nem eu sei explicar", true)
			.addField(prefix + "help fun", "Comandos que não são `text`", true)
			// .addField(prefix + "help music", "Comandos de música", true)
			.addField(prefix + "help bot", "O resto", true)
			.setColor('0xDA1354');
		return message.channel.send(embed);
	}

	if(ajuda == "text") {
		var embed = new MessageEmbed()
			.setTitle("TEXT")
			.addField("avatar [user]", "Quer ver sua linda foto de perfil?", false)
			.addField("emoji", "Quer ver quantos emojis esse servidor tem?", false)
			.addField("gato", "Vai um gatinho?", false)
			.addField("chorro", "Ou um cachorrinho?", false)
			.addField("neko", "Um gatinho diferente?", false)
			.addField("hentai", "Vai um ban?", false)
			.addField("loli", "Não", false)
			.addField("jojo", "ZA WARUDO!", false)
			.addField("link", "Um link aleátorio do Nhentai. Boa sorte", false)
			.addField("numero", "1-99999",)
			.addField("sorteio", "Informações sobre o sorteio", false)

			.setColor('0xDA1354')
			.setFooter("<> - Argumento obrigátorio \n[] - Argumento opcional");
		return message.channel.send(embed);
	} else if(ajuda == "fun") {
		var embed = new MessageEmbed()
			.setTitle("FUN")
			.addField("ask <pergunta>", "Faça uma pergunta que eu irei te responder, fiz um curso online de vidente :crystal_ball:", false)
			.addField("roll [Nº de Rolls]d<Face do dado>", "Quer jogar um RPG?", false)
			.addField("coin", "Cara ou coroa?", false)
			.addField("gado [user]", "Qual a sua porcentagem gado?", false)
			.addField("gay [user]", "Vish", false)
			.addField("ppt", "Se você ganhar de mim, seu prêmio será um incrivel nada!", false)
			.addField("search <pesquisa>", "Faça uma pesquisa", false)
			.addField("ship <user> [user2]", "Será que esse relacionamento vai pra dar bom?", false)
	
			.setColor('0xDA1354')
			.setFooter("<> - Argumento obrigátorio \n[] - Argumento opcional");
		return message.channel.send(embed);
	/*} else if(ajuda == "xxxmusic") {
		var embed = new Discord.MessageEmbed()
			.setTitle("MUSIC")
			.addField("join", "Entro num canal de voz mas não falo nada", false)
			.addField("stop", "Vou parar a música e sair do canal de voz", false)
			.addField("play <música>", "Tunts Tunts", false)
			.addField("pause", "Precisa ir no banheiro?", false)
			.addField("resume", "Solta o som DJ", false)
			.addField("skip", "Essa música ta ruim?", false)
			.addField("np", "Quer saber oque está tocando agora?", false)
			.addField("queue", "Lista das músicas que vão tocar", false)
	
			.setColor(color)
			.setFooter("<> - Argumento obrigátorio \n[] - Argumento opcional")*/
		return message.channel.send(embed);
	} else if(ajuda == "bot") {
		var embed = new MessageEmbed()
			.setTitle("BOT")
			.addField("clear <Nº de mensagens>", "Limpar mensagens no chat", false)
			.addField("dm <user> <mensagem>", "Conversar cara a cara", false)
			.addField("say <mensagem>", "Comando restrito", false)
			.addField("ping", "Pinga", false)
			.addField("sobre", "Sobre eu :)", false)

			.setColor('0xDA1354')
			.setFooter("<> - Argumento obrigátorio \n[] - Argumento opcional");
		return message.channel.send(embed);
	}

};
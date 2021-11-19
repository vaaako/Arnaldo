const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

// // MUSICA
// const DisTube = require('distube')

// client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: false });

// // `[${song.name}](${song.url}) - *(${song.formattedDuration})* \nRequested by: ${song.user}`
// color = 0xDA1354
// // CA1773

// client.distube
// 	.on("playSong", (message, queue, song) => {
// 		var embed = new Discord.MessageEmbed()
// 			.setTitle("Tocando :notes:")
// 			.setDescription(`[${song.name}](${song.url})`)
// 			// .addField("Canal", song.channel, true)
// 			.addField("Duração", song.formattedDuration, true)
// 			.addField("Requested By", song.user, true)
// 			.setThumbnail(song.thumbnail)
// 			.setColor(color)

// 		return message.channel.send(embed)
// 	})
// 	.on("addSong", (message, queue, song) => {
// 			var embed = new Discord.MessageEmbed()
// 			.setTitle("Adicionado!")
// 			.setDescription(`[${song.name}](${song.url})`)
// 			// .addField("Canal", song.channel, true)
// 			.addField("Duração", song.formattedDuration, true)
// 			.addField("Requested By", song.user, true)
// 			.setThumbnail(song.thumbnail)
// 			.setColor(color)

// 		// message.channel.send(`**Adicionado :musical_note:**  \n\`${song.name}\` - *(${song.formattedDuration})* \nRequested by: ${song.user}`
// 		return message.channel.send(embed)
// 	})
// 	// .on("finish", (message, queue, song) => {
// 	// 	var embed = new Discord.MessageEmbed()
// 	// 		.setTitle("Acabou")
// 	// 		.setDescription("Todas as músicas foram tocadas")
// 	// 		.setColor(color)

// 	// 	return message.channel.send(embed)
// 	// })

// PRESENÇA DO BOT
setInterval(function(){
	client.user.setPresence({
		activity: {
			name: "Sua tia do 4º andar",
			type: "PLAYING"
		}
	}), 5000 // 5seg tempo para mudar 
	
	client.user.setPresence({
		activity: {
			name: "Você",
			type: "WATCHING"
		}
	}), 5000

	client.user.setPresence({
		activity: {
			name: "Seus Movimentos",
			type: "LISTENING"
		}
	}), 5000
	
	client.user.setPresence({
		activity: {
			name: "Conversando com outros bots",
			url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			type: "STREAMING"
		}
	})

}, 10000)


//MENSAGEM DE CONFIRMÇÃO DE QUE O BOT ESTÁ ONLINE
client.on("ready", () => { // @on_ready

  client.user.setStatus("online") //idle, dnd, online, invisible
    .catch(console.log);
  console.log("Estou Online!")

	console.log(`Eu estou online agora, meu nome é ${client.user.username}. Há ${client.users.cache.size} usuário(s) em ${client.guilds.cache.size} servidor(es) e em ${client.channels.cache.size} canais! \nMinha ID é ${client.user.id}`)

});


// PARA COMANDOS QUE PRECISA CHECAR AS MENSAGENS
client.on('message', message => {

	const vako_shy = ["703785252463837234", "602303260572778516", "876286395348561951"];
	// const gay = ["gayy", "viado", "homosexual"];
	// const aniver = ["aniversario", "aniversário"];
	const para = ["parabens", "parabéns"];
	const oni = ["oni-chan", "oni chan", "one-chan", "one chan", "onee-chan", "onee chan", "onichan", "oniichan", "onii chan", "onechan", "oneechan"];

	const msg = message.content.toLowerCase()


	if (message.author.bot) return;

	if(message.content.includes(`<@!${client.user.id}>`) || message.content.includes(`<@${client.user.id}>`)){
		if(vako_shy.includes(message.author.id)) {
			return message.channel.send("Sim senhor(a)?");
		} else {
			return message.channel.send("Que foi porra?");
		}
	}

	// if(msg.includes("sex")) {
		// message.react('😏');
	// }

	if(msg.includes("nazi")) {
		message.react('✋');
	}

	// if(gay.some(v => msg.includes(v))) {
	// 	message.react('🏳️‍🌈');
	// }

	// if(aniver.some(v => msg.includes(v))) {
	// 	message.react('🎂');
	// 	message.channel.send("Feliz aniversário \nParabéns :partying_face: :birthday:");
	// }
	if(para.some(v => msg.includes(v))) {
		message.channel.send("Parabéns :partying_face:");
	}

	if(oni.some(v => msg.includes(v))) {
		message.react('😡');
		message.reply("Oni chan é meu ovo")
	}
});

// PARA PROCURAR COMANDOS NA PASTA DE COMANDOS
client.on('message', message => { // @on_message
  if (message.author.bot) return; // Se a mensagem é do bot
  // if (message.channel.type == 'dm') return; // Se comando foi na dm

	if (!message.content.toLowerCase().startsWith(config.prefix)) return;

	// PEGANDO COMANDOS DO ./commands
  const args = message.content
		.trim().slice(config.prefix.length)
		.split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`)
    commandFile.run(client, message, args);
  } catch (err) {
    // console.error('Erro: ' + err.stack);
		;
  }

});

client.login(process.env.TOKEN);

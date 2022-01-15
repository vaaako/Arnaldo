const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

const Discord = require("discord.js"); // Conexão com a livraria Discord.js
const client = new Discord.Client(); // Criação de um novo Client
const config = require("./config.json"); // Pegando o prefixo do bot para respostas de comandos

// PRESENÇA DO BOT
setInterval(function(){
	// PLAYING, WATCHING, LISTENING, STREAMING	
	client.user.setPresence({
		activity: {
			name: "Você",
			type: "WATCHING"
		}
	}), 5000
	
	client.user.setPresence({
		activity: {
			name: "Conversando com outros bots",
			url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			type: "STREAMING"
		}
	})

},5000);


// QUANDO O BOT ESTIVER CONECTADO
client.on("ready", () => {

	client.user.setStatus("idle") //idle, dnd, online, invisible
		.catch(console.log);
	console.log("Estou Online!");

	console.log(`Eu estou online agora, meu nome é ${client.user.username}.`);
	console.log(`Há ${client.users.cache.size} usuário(s) em ${client.guilds.cache.size} servidor(es) e em ${client.channels.cache.size} canais!`) ;
	console.log(`Minha ID é ${client.user.id}`);
});


// PARA COMANDOS QUE PRECISA CHECAR AS MENSAGENS
client.on('message', message => {

	if (message.author.bot) return;
	if (message.channel.type == 'dm') return;
	// Só piadinha
	if(message.content.includes(`<@!${client.user.id}>`) || message.content.includes(`<@${client.user.id}>`)) {
		const { whitelistCheck } = require('./files/src/whitelistCheck.js');
		const check = whitelistCheck(message.author.id);
		if(check) return message.channel.send("Sim senhor?");
			else return message.channel.send("Que foi porra?");
	}

	if (!message.content.toLowerCase().startsWith(config.prefix)) return;

	const msg = message.content.toLowerCase();
	const para = ["parabens", "parabéns"];
	if(para.some(v => msg.includes(v))) message.channel.send("Parabéns :partying_face:");

	// PROCURAR COMANDOS NAS PASTAS DE COMANDO
	const { pegaOsComandoLa } = require('./files/src/loader.js')
	pegaOsComandoLa(client, message);

});

client.login(process.env.TOKEN);

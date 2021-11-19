const Discord = require('discord.js');

respostas = [
	"Sim",
	"Claro",
	"Ainda tem dúvidas?",
	"Não",
	"De jeito nenhum",
	"Definitivamente não",
	"Talvez?",
	"Não sei dizer",
	"Ainda não está na hora de saber"
]

color = 0xDA1354
module.exports.run = async (client, message, args) => {

  var rand = respostas[Math.floor(Math.random() * respostas.length)];
  const pergunta = args.join(' ');
	const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec)); // delay

	if(!pergunta) {
		return message.channel.send("Você precisa escrever a pergunta para que eu possa responder");
	}

	let embed = new Discord.MessageEmbed()
		.setTitle("\n")
		.setDescription("Humm...")
		.setColor(color)

  let embedF = new Discord.MessageEmbed()
    .setTitle(pergunta)
		.setDescription(rand)
		.setColor(color)
	
	const m = await message.channel.send(embed)
	await delay(3000);
	await m.edit(embedF);	
	

};
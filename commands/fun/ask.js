const { MessageEmbed } = require('discord.js');
const { sleep } = require('../../files/utils/sleep.js');

const respostas = [
	"Sim",
	"Claro",
	"Ainda tem dúvidas?",
	"Não",
	"De jeito nenhum",
	"Definitivamente não",
	"Talvez?",
	"Não sei dizer",
	"Ainda não está na hora de saber"
];

module.exports.run = async (client, message, args) => {

	var rand = respostas[Math.floor(Math.random() * respostas.length)];
	const pergunta = args.join(' ');

	if(!pergunta) return message.channel.send("Não tem como eu responder se você não me disser a pergunta");

	let embed = new Discord.MessageEmbed()
		.setTitle(pergunta)
		.setDescription(rand)
		.setColor('0xDA1354');
	
	const m = await message.channel.send("Hmm...");
	sleep(3000);
	m.delete();

	return message.channel.send(embed);
};

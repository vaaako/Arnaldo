const { MessageEmbed } = require('discord.js');
module.exports.run = async(client, message, args) => {

	if(!message.member.permissions.has("MANAGE_MESSAGES")) return;

	const deleteCount = parseInt(args[0], 10); // passar pra inteiro na base de 10

	if(!deleteCount) return message.channel.send("Acho que você esqueceu alguma coisa");
	if(deleteCount > 100 ) return message.channel.send("Desculpa o máximo que eu posso limpar é `100`");
	if(isNaN(deleteCount)) return message.channel.send("Digite um número por favor");

	const final = deleteCount + 1; // Isso para deletar a mensagem enviada mais a última

	let embed = new MessageEmbed()
		.setTitle("\n")
		.setDescription(`\`${deleteCount}\` mensagens limpas:broom: \nPelas ordens de ${message.author}`)
		.setColor('0xDA1354');

	message.channel.bulkDelete(final).then(() => {
    message.channel.send(embed).then((sent) => {
		setTimeout(() => {
			sent.delete();
			}, 2500);
		});
	}).catch((e) => {
        console.log(e.stack);
        return message.channel.send("Não foi possível limpas essas mensagens \nTalvez elas foram enviadas a muito tempo, o que me impede de remove-las");
	});
};

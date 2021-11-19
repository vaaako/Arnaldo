const Discord = require('discord.js');
color = 0xDA1354

module.exports.run = async(client, message, args) => {
  
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
		message.reply("Você não possui a permissão necessária para usar esse comando.")

	const deleteCount = parseInt(args[0], 10); // passar pra inteiro na base de 10

	if(!deleteCount) {
		var embed = new Discord.MessageEmbed()
			.setTitle("Acho que você esqueceu alguma coisa")
			.setColor(color)
		return await message.channel.send(embed);
	} else if(deleteCount > 100 ) {
		var embed = new Discord.MessageEmbed()
			.setTitle("Desculpa o máximo que eu posso limpar é `100`")
			.setColor(color)
		return await message.channel.send(embed);
	} else if(isNaN(deleteCount)) {
		var embed = new Discord.MessageEmbed()
			.setTitle("Digita um número por favor")
			.setColor(color)
		return await message.channel.send(embed);
	}

		const final = deleteCount + 1 // isso para deletar a mensagem enviada mais a ultima

		var embed = new Discord.MessageEmbed()
			.setTitle("\n")
			.setDescription(`\`${deleteCount}\` mensagen(s) limpa(s):broom: \nPelas ordens de ${message.author}`)
			.setColor(color)

		message.channel.bulkDelete(final).then(() => {
      message.channel
        .send(embed)
        .then((sent) => {
          setTimeout(() => {
            sent.delete();
          }, 2500);
				});
    	});


};

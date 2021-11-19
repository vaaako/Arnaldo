const Discord = require('discord.js');

let vako_shy = ["703785252463837234", "602303260572778516", "876286395348561951"]
module.exports.run = async (client, message, args) => {
  

  if(!vako_shy.includes(message.author.id)) return message.reply("É viadasso e furry!")
	

  const sayMessage = args.join(' ');

  if(!sayMessage) {
    return message.channel.send("Digite algo para que eu dizer!")
  }
  message.delete()
  message.channel.send(sayMessage)

};

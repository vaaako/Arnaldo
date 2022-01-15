module.exports.run = async (client, message, args) => {
  const { whitelistCheck } = require("../../files/src/whitelistCheck.js");

  const check = whitelistCheck(message.author.id)
  if(!check) return message.reply("Tu é um Jão");
	
  const sayMessage = args.join(' ');
  if(!sayMessage) return message.channel.send("Digite algo para eu dizer!");

  message.delete();
  message.channel.send(sayMessage);

};

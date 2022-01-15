const { MessageEmbed } = require('discord.js');
const { getUser } = require("../../files/utils/getUser.js");

module.exports.run = async (client, message, args) => {

	const member = getUser(client, message, args[0]) || "Você";

	const rand = Math.floor(Math.random() * 100) + 1;
	// let rand = 100

	let embed = new MessageEmbed()
		.setTitle("Detector de gado")
		.setDescription(`${member} é \`${rand}%\` gado :ox:`)
		.setColor('0xDA1354');

	if(rand>=90){
		embed.addField("\u200B", "Parece que encontramos o **Rei do Gado!**", false);

		message.channel.send("https://www.youtube.com/watch?v=XGyzPEdavEY");
		return message.channel.send(embed);
	}

	return message.channel.send(embed);
};

const { MessageEmbed } = require('discord.js');
const { getUser } = require("../../files/utils/getUser.js");

module.exports.run = async (client, message, args) => {

	const member = getUser(client, message, args[0]) || "Você";

	if(message.author.id=="690969883151826976") {
		var rand = 24
	} else {
		var rand = Math.floor(Math.random() * 100) + 1;
	}
	// let rand = 24;

  let embed = new MessageEmbed()
    .setTitle("Detector de gay :gay_pride_flag:")
		.setDescription(`${member} é \`${rand}%\` gay :gay_pride_flag:`)
		.setColor('0xDA1354');

	if(rand==24) embed.addField("Parabéns", "Você é o **Gay MASTER!** 🏳️‍🌈");

	return message.channel.send(embed);

};

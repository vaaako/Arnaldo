const { MessageEmbed } = require('discord.js'); // Import
const { whitelistCheck } = require('../../files/src/whitelistCheck.js');

module.exports.run = async (client, message) => {
  const member =  message.mentions.users.array();
	if(!member[0]) return message.channel.send("Marque alguem  para eu poder calcular o amor entre vocês dois.");
	
	if(whitelistCheck(message.author.id) && whitelistCheck(member[0].id) || whitelistCheck(member[0].id) && whitelistCheck(message.author.id)) {
		var love_int = 100;
	} else {
		var love_int = Math.floor(Math.random() * 101);
	};

	let love = parseInt(Math.ceil((love_int/4)-2)); // 1-23 (pra calcular os retangulos)
	if(love == 23) {
		var space = 0; // Todos os retangulos sem espaço
	} else {
		var space = Math.abs(love-22);
	};

	var member1 = member[0].avatarURL({ dynamic: true, format: "png", size: 1024 });

	var member2 = member[1] || message.author;
	var member2 = member2.displayAvatarURL({format: "png"});

  let embed = new MessageEmbed()
    .setTitle(`Calculadora de amor :two_hearts: \n${String(love_int)}% de amor`)
		.setDescription(`:smiling_face_with_3_hearts: \n[\`${"█".repeat(love)} ${".".repeat(space)}\`]`)
		.setThumbnail(member2)
		.setImage(member1)
		.setColor('0xDA1354')
	await message.channel.send(embed);

};

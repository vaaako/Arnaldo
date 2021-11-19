const Discord = require('discord.js'); // Import

color = 0xDA1354
let vako_shy = ["703785252463837234", "602303260572778516"];
module.exports.run = async (client, message) => {
  
  const member =  message.mentions.users.array();

	if(!member[0]) {
		return await message.channel.send("Marque alguem  para eu poder calcular o amor entre vocês dois.");
	}
	
	if (vako_shy.includes(message.author.id) && vako_shy.includes(member[0].id) || vako_shy.includes(member[0].id) && vako_shy.includes(member[1].id)) {
		var love_int = 100;
	} else {
		var love_int = Math.floor(Math.random() * 101);
	}

	let love = parseInt(Math.ceil((love_int/4)-2));

	if(love == 23){
		var space = 0;
	} else {
		var space = Math.abs(love-22);
	}

	var member1 = member[0];
	var member1 = member1.avatarURL({ dynamic: true, format: "png", size: 1024 });

	var member2 = member[1] || message.author;
	var member2 = member2.displayAvatarURL({format: "png"});


  let embed = new Discord.MessageEmbed()
    .setTitle("Calculadora de amor :two_hearts:")
		.setDescription("`" + String(love_int) + "%` de amor :smiling_face_with_3_hearts: \n" + "[`" + "█".repeat(love) + ".".repeat(space) + "`]")
		.setThumbnail(member2)
		.setImage(member1)
		.setColor(color)
	await message.channel.send(embed);

};

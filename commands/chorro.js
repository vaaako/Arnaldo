const Discord = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args)); // para poder usar o fetch (oque faz possivel usar a API)

color = 0xDA1354
module.exports.run = async (client, messsage) => {
  
	const res = await fetch('https://dog.ceo/api/breeds/image/random');
	const { message } = await res.json()
	DOG = message

  let embed = new Discord.MessageEmbed()
    .setTitle("Au au au :dog:")
		.setImage(DOG)
		.setColor(color)
	await messsage.channel.send(embed);

};

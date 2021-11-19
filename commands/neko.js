const Discord = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args)); // para poder usar o fetch (oque faz possivel usar a API)

color = 0xDA1354
module.exports.run = async (client, message) => {
  
	const res = await fetch('https://api.neko.airforce/api/neko');
	const { url } = await res.json()
	NEKO = url

  let embed = new Discord.MessageEmbed()
    .setTitle("Aqui está sua neko.")
		.setImage(NEKO)
		.setColor(color)
	await message.channel.send(embed);

};

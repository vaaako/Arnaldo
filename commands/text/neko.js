const { MessageEmbed } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args)); // para poder usar o fetch (oque faz possivel usar a API)

color = 
module.exports.run = async (client, message) => {
  
	const res = await fetch('https://api.neko.airforce/api/neko');
	const { url } = await res.json();
	const neko = url;

  let embed = new MessageEmbed()
    .setTitle("Aqui está sua neko.")
		.setImage(neko)
		.setColor('0xDA1354');
	await message.channel.send(embed);

};

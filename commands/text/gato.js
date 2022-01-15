const { MessageEmbed } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args)); // para poder usar o fetch (oque faz possivel usar a API)

module.exports.run = async (client, message) => {
  
	const res = await fetch('https://api.neko.airforce/api/cat');
	const { url } = await res.json();
	const gato = url;

  let embed = new MessageEmbed()
    .setTitle("Miau miau miau :cat:")
		.setImage(gato)
		.setColor('0xDA1354');
	await message.channel.send(embed);

};

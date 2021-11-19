const Discord = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args)); // para poder usar o fetch (oque faz possivel usar a API)

color = 0xDA1354
module.exports.run = async (client, message) => {
  
  let embed = new Discord.MessageEmbed()
    .setTitle("Vou ligar pro 190 seu otário :telephone_receiver:")
		.setImage('https://media.socastsrm.com/wordpress/wp-content/blogs.dir/1906/files/2021/06/fbi.jpg')
		.setColor(color)
	await message.channel.send(embed);

};

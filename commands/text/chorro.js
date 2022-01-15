const { MessageEmbed } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args));

module.exports.run = async (client, message) => {
  
	const res = await fetch('https://dog.ceo/api/breeds/image/random');
	const dogApi = await res.json();
	const dog = dogApi.message;

  let embed = new Discord.MessageEmbed()
    .setTitle("Au au au :dog:")
		.setImage(dog)
		.setColor('0xDA1354');
	await message.channel.send(embed);

};

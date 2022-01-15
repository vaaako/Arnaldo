const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message) => {
  
  let embed = new MessageEmbed()
    .setTitle("Vou ligar pro 190 seu otário :telephone_receiver:")
		.setImage('https://media.socastsrm.com/wordpress/wp-content/blogs.dir/1906/files/2021/06/fbi.jpg')
		.setColor('0xDA1354');
	await message.channel.send(embed);

};

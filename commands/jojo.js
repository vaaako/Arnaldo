const Discord = require('discord.js');

module.exports.run = async (client, message) => {

	const fs = require('fs');
	fs.readFile('JSONs/jojo.json', function readFileCallback(err, obj) {

		var obj = JSON.parse(obj);

		var properties = Object.getOwnPropertyNames(obj) // pega um obejto aleatorio
		var index = Math.floor(Math.random() * properties.length); // fazer pegar o index de um dos objetos - obj[properties[index]]
		
		var rand_key = Math.floor(Math.random() * obj[properties[index]].length) // pega o index de um dos itens do objeto

		output = obj[properties[index]][rand_key]
		// console.log(output);

		message.delete()
		message.channel.send(output)
	})

};
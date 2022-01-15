const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) => {

	// fução para somar itens da lista
	function add(accumulator, a) {
		return accumulator + a;
	};

	var rolls_list = [];

	if(!args[0]) return message.channel.send("Por favor digite da forma correta");

	if(args[0].includes("d")) {
		var values = args[0].split("d");
		var rolls = values[0];
		var sides = values[1];
	} else {
		var rolls = 1;
	};

	if(sides <= 0) return message.channel.send("Esqueceu de digitar quantas faces tem o dado");
	if(isNaN(rolls) || isNaN(sides)) return message.channel.send("Digite números");
	if(rolls > 99 || sides > 200) return message.channel.send("Esse número é muito grande pra um dado");

	parseInt(rolls);
	parseInt(sides);

	for(let i = 0; i < rolls; i++) {
		rolls_list.push(Math.floor(Math.random() * sides) + 1);
	};

	var sum = rolls_list.reduce(add,0); // somando itens da lista

	let embed = new MessageEmbed()
    .setTitle("Você tirou `" + sum + "`")
		.addField("Rolls", `[${rolls_list.toString()}]`, false)
		.setThumbnail("https://s3.amazonaws.com/images.ecwid.com/images/7771588/946830785.jpg")
		.setColor('0xDA1354');
	return message.channel.send(embed);

};

function getPhrase() {
	const obj = require('../../files/database/statics/jojo.json');
	// var obj = JSON.parse(obj);

	let properties = Object.getOwnPropertyNames(obj); // Pega um objeto aleatório
	let index = Math.floor(Math.random() * properties.length); // Pegar o index de um dos objetos - obj[properties[index]]
	
	let rand_key = Math.floor(Math.random() * obj[properties[index]].length); // Pega o index de um dos itens do objeto
	let output = obj[properties[index]][rand_key];

	return output;
}

module.exports = {
	name: "jojo",
	category: "Text",
	aliases: [],
	usage: "jojo",
	description: getPhrase(),
	run: async (client, message) => {
		message.channel.send(getPhrase()).then(() => {
			message.delete();
		}).catch(() => console.log("Erro -> Delete message [Ignore]"));;
	}
};

module.exports = {
	name: "coin",
	category: "Fun",
	aliases: ["moeda"],
	usage: "coin",
	run: async (client, message) => {
		let num = Math.floor(Math.random() * 2) + 1;

		if(num == 1)
			return message.react('😀');
		else 
			return message.react('👑');
	}
};

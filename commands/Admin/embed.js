const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "embed",
	category: "",
	aliases: [],
	usage: "embed <title> + <description>",
	whitelistOnly: true,
	run: async (client, message, args) => {
		var info = args.slice(0).join(' '); // Botar array em string
		var info = info.split("+"); // Colocar string em array separado por $
	
		const title = info[0];
		const description = info[1] || "\n";

		let embed = new MessageEmbed()
			.setTitle(title)
			.setDescription(description)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed]  })
	}
};

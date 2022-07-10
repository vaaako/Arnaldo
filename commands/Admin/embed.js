const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "embed",
	category: "",
	aliases: [],
	usage: "embed <title> + <description>",
	whitelistOnly: true,
	run: async (client, message, args) => {
		var info = args.slice(0).join(' ').split("+");
	
		const TITLE = info[0];
		const DESCRIPTION = info[1] || "\n";

		let embed = new MessageEmbed()
			.setTitle(TITLE)
			.setDescription(DESCRIPTION)
			.setColor(ee.color);
		message.channel.send({ embeds: [embed]  })
	}
};

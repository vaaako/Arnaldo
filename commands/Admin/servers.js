const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "servers",
	category: "",
	aliases: [],
	usage: "servers",
	whitelistOnly: true,
	run: async (client, message) => {
		var servers = "";
		var len = 0;

		client.guilds.cache.forEach((guild) => {
			len += 1;
			servers += `**${guild.name}** | \`${guild.id}\`\n`;
		});

		let embed = new MessageEmbed()
			.setDescription(`${servers} \nEstou em ${len} Servidores :)`)
			.setColor(ee.color)
		message.channel.send({ embeds: [embed] });
	}
};

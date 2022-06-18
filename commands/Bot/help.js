const { langHandler } = require('../../files/translations/langHandler.js');

const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");

const { prefix } = require("../../config/config.js");

module.exports = {
	name: "help",
	category: "Information",
	aliases: ["ajuda", "comandos", "help", "commands"],
	usage: "help [command]",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).bot.help;

		if(args[0]) {

			const search = args[0].toLowerCase();
			const cmd = client.commands.get(search) || client.commands.get(client.aliases.get(search));

			if(!cmd) // Command not found
				message.reply(LANGUAGE.noCmd.replace('$COMMAND', search));

			const embed = new MessageEmbed().setColor(ee.color);

			if(cmd.name) {
				embed.addField("**Command**", `\`${cmd.name}\``);
				embed.setTitle(`${LANGUAGE.EMBED.cmd.title} \`${cmd.name}\``);
			}
			if(cmd.description) // Just for the jojo command
				embed.addField("**Description**", `\`${cmd.description}\``);
			else // Add description by json
				embed.addField("**Description**", `\`${langHandler(message)[cmd.category.toLowerCase()][cmd.name]['description']}\``);


			let aliases = cmd.aliases.map((al) => `${al}`).join("`, `");
			if(cmd.aliases && aliases.length>0)
				embed.addField("**Aliases**", `\`${aliases}\``);

		
			if(cmd.usage) {
				embed.addField("**Usage**", `\`${prefix}${cmd.usage}\``);
				embed.setFooter({ text: LANGUAGE.EMBED.cmd.footer });
			}

			return message.channel.send({ embeds: [embed] });
		} else {
			const embed = new MessageEmbed()
				.setTitle("HELP MENU 🦜🤙 Commands")
				.setThumbnail(client.user.displayAvatarURL())
				.setFooter({ text: LANGUAGE.EMBED.noCmd.footer.replace('$PREFIX', prefix), icon_url: [client.user.displayAvatarURL()] })
				.setColor(ee.color);

			const commands = (category) => {
				return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
			};
			
			for(let i = 0; i < client.categories.length; i += 1) {
				const current = client.categories[i]; // Category
				const items = commands(current); // Commands
				if(items.length==0) 
					continue;

				// embed.addField(`**${current.toUpperCase()} [${items.length}]**`, `${items.join(" ")}`, false);
				embed.addField(`\u200B`, `**${current.toUpperCase()} [${items.length}]** \n${items.join(" ")}`, false);
			};
			return message.channel.send({ embeds: [embed] });
		};

	}
};

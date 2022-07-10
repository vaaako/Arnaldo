const fs = require("fs");
const { MessageEmbed } = require('discord.js');
const { langHandler } = require('../../files/translations/langHandler.js');

const ee = require('../../config/embed.json');

module.exports = {
	name: "notes",
	category: "Utils",
	aliases: ["note", "nota", "notas"],
	usage: "note [nota | remove] [N°]",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).utils.notes;

		// Database
		let obj = JSON.parse(fs.readFileSync('files/database/profiles.json', 'utf-8'));
		const id = message.author.id;

		// Remove

		if(!args[0]) {
			let embed = new MessageEmbed()
				.setTitle(`${message.author.username}${LANGUAGE.EMBED.title}`)
				.setColor(ee.color)
			
			// Verify if the user has notes
			let length = obj[id]['notes'].length;
			var notes = "";
			if(length>0) {
				for(let i=0; i<obj[id]['notes'].length; i++)
					notes+=`**${i+1}.** ${obj[id]['notes'][i]}\n`;
				embed.setDescription(notes);
			} else {
				embed.addField(LANGUAGE.noNotes, '\u200B');
			}
			return message.reply({ embeds: [embed] }); // Return to not save
		}

		if(["remove", "delete", "del", "rem"].indexOf(args[0].toLowerCase()) > -1) {
			if(!args[1] || !obj[id]['notes'][args[1]-1])
				return message.reply(LANGUAGE.invalid);
			obj[id]['notes'].splice(args[1]-1, 1); // Removing from array
			message.reply(LANGUAGE.removed);

		} else { // Adding new note
			obj[id]['notes'].push(args.join(' '));
			message.reply(LANGUAGE.newNote);
		}
		fs.writeFileSync('files/database/profiles.json', JSON.stringify(obj, null, 1)); // Saving 
	}
};

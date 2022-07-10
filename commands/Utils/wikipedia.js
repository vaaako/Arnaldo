const { langHandler } = require('../../files/translations/langHandler.js');

const wiki = require('wikipedia');

const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "wikipedia",
	category: "utils",
	aliases: ["wiki"],
	usage: "wikipedia [something]",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).utils.wikipedia;

		wiki.setLang(langHandler(message).language) // Set language

		// Random article or not
		let toSearch = args.join(' ');
		if(!toSearch) {
			let summary = await wiki.random();

			let embed = new MessageEmbed()
				.setTitle(summary['title'])
				.setDescription(summary['extract'])
				.setFooter({ text: "Random wikipedia's page" })
				.setTimestamp()
				.setColor(ee.color);

			if(summary['originalimage']) // If has image
				embed.setImage(summary['originalimage']['source']);
			return message.channel.send({ embeds: [embed]  }); //Returns wikiSummary of a random pageOption
		}


		let searchResults = await wiki.search(toSearch); // Getting results and suggestion
		const suggestion = searchResults['suggestion'];
		const results = searchResults['results'];

		// Get summary
		var summary;
		if(!suggestion)
			if(results.length==0)
				return console.log('No results') // If don't have suggestion and results
			else
				summary = await wiki.summary(results[0]['title']); // By result
		else
			summary = await wiki.summary(suggestion); // By suggestion

		let extract = summary['extract'];
		if(!extract) // If don't has a page to that language
			return message.reply(LANGUAGE.noResults)

		let embed = new MessageEmbed()
			.setTitle(summary['title'])
			.setDescription(extract)
			// .setThumbnail(originalimage['source'] ? originalimage : false) // Ternal operation for add image or not
			.setTimestamp()
			.setColor(ee.color);

		if(summary['originalimage'])
			embed.setImage(summary['originalimage']['source']);

		message.channel.send({ embeds: [embed]  })
	}
};

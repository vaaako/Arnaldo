const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "image",
	category: "",
	aliases: [""],
	usage: "",
	whitelistOnly: true,
	run: async (client, message, args) => {
		if(!args[0])
			return message.reply("No args");
		
		const request = require("request")
		const urlExists = url => new Promise((resolve, reject) => request.head(url).on("response", res => resolve(res.statusCode.toString()[0] === "2")))
		let img = await urlExists("https://googlea.com").catch(() => {
			return;
		})//.then(exists => console.log(exists)) // true
		console.log(img)
// args[0]
		if(img) {
			let embed = new MessageEmbed()
				.setTitle("Image test")
				.setImage()
				.setTimestamp()
				.setColor("RANDOM");
			return message.reply({ embeds: [embed] })
		} else {
			return message.reply("No img")
		}

		// let attachments = Array.from(message.attachments);
		// if(attachments.length>0) {
		// 	obj['background'] = attachments[0][1].url; // Getting attachment url
		// }
	}

};
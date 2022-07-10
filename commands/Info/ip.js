const { langHandler } = require('../../files/translations/langHandler.js');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch (...args)); // node-fetch
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
	name: "ip",
	category: "Info",
	aliases: [],
	usage: "ip <ip>",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).info.ip;
		
		let ip = args[0] || ' ';
		// if(!ip) return message.channel.send("Esqueceu de digitar o IP");
		
		const res = await fetch('http://ip-api.com/json/'+ip);
		const values = await res.json();

		if(values['status']=="fail")
			return message.channel.send();


		// print(" Internet: " + values['isp'])
		// print(" País: " + values['country'])
		// print(" Estado: " + values['region'])
		// print(" ZIP: " + values['zip'])
		// print(" Latitude: " + str(values['lat']))
		// print(" Longitude: " + str(values['lon']))
		// print(" Fuso do horário: " + values['timezone'])

		let embed = new MessageEmbed()
			.setTitle(values['query'])
			.setDescription(`${LANGUAGE.EMBED.DESCRIPTION.internet} \`${values['isp']}\` \n${LANGUAGE.EMBED.DESCRIPTION.country} \`${values['country']}\` \n${LANGUAGE.EMBED.DESCRIPTION.region}  \`${values['region']}\` \n${LANGUAGE.EMBED.DESCRIPTION.city} \`${values['city']}\` \n${LANGUAGE.EMBED.DESCRIPTION.zip} \`${values['zip']}\` \n${LANGUAGE.EMBED.DESCRIPTION.lat} \`${values['lat']}\` \n${LANGUAGE.EMBED.DESCRIPTION.lon} \`${values['lon']}\` \n${LANGUAGE.EMBED.DESCRIPTION.timezone} \`${values['timezone']}\` \n`)
			.setFooter({ text: `Powered by ip-api` })
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });
	}
};

module.exports = {
	name: "backup",
	category: "",
	aliases: [],
	usage: "None",
	description: "None",
	whitelistOnly: true,
	run: async (client, message) => {
		message.channel.send({
			files: [
				'files/database/profiles.json',
				'files/database/servers.json'
			],
			content: `Databases`
		})
		
		// message.channel.send({
		//     files: [{
		//         attachment: 'files/database/shinyhunt.json',
		//         name: 'shinyhunt.json'
		//     }],
		//     content:`Testing message.`,
		// });
	}
};

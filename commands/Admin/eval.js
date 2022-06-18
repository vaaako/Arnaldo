const { TOKEN } = require('../../config/config.js');

module.exports = {
	name: "eval",
	category: "",
	aliases: ["ev"],
	usage: "eval <code>",
	description: "Evaluates javascript code",
	whitelistOnly: true,
	run: async (client, message, args) => {
		var code = args.join(" ").trim() //message.content.replace(new RegExp(`${prefix}+ev(al)?`, "gi"), "").trim();
		code = code.replace(/(^\`{3}js(\n|\s)*)|((\n|\s)*\`{3}$)/g, ""); // allows the usage of the js code block in discord (```js...```)
		const result = new Promise((resolve, reject) => resolve(eval(code)));
	
		return result
		// .then((output) => {
		// 	let original = output;
		// 	if (typeof output !== "string") {
		// 		output = require("util").inspect(output, { depth: 1 });
		// 	}
		// 	if (output.includes(message.client.token)) {
		// 		output = output.replace(message.client.token, TOKEN); //replaces the token 
		// 	}
		// 	message.channel.send(`\`\`\`${output.substring(0, 1900)}\`\`\``, { //cuts response message short of discord message limit of 2000 chars
		// 		code: "js",
		// 	});
		// })
		.catch((err) => {
			err = err.toString();
			if (err.includes(message.client.token)) {
				err = err.replace(message.client.token, TOKEN); //replaces the token
			}
			message.channel.send(`\`\`\`${err}\`\`\``, {
				code: "js",
			});
		});

	}
};

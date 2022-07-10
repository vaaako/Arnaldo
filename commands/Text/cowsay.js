const { langHandler } = require('../../files/translations/langHandler.js');

module.exports = {
	name: "cowsay",
	category: "Text",
	aliases: ["cow", "vaca", "vacafala"],
	usage: "cowsay <message>",	
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).text.cowsay;

		if(!args)
			return message.reply(LANGUAGE.noMoo);
		var data = args.join(' ');

		// Add all lines to array
		var lines = []
		const length = data.length;
		for(let i=0, len=""; i<length; i++) {
			len+=data[i];
			if(len.length==39 || i==length-1) {
				while (lines.length>0 && len.length<39) // Add white spaces
					len+=" ";
				lines.push(len);
				len="";
			}
		}

		// Top and bottom lines
		const dashCount = lines[0].length+2;
		const header = ` ${'_'.repeat(dashCount)} \n`;
		const footer = ` ${'-'.repeat(dashCount)} \n`;

		// Outline
		let final;
		if(lines.length==1) 
			final = `< ${data} >\n`;
		else {
			let first = `/ ${lines.shift()} \\\n`;
			let between = lines.map((l) => `| ${l} |\n`).join(''); // Add fo each line
			let last = `\\ ${lines.pop()} /\n`;

			final = first + between + last;
		}

const COW = `      \\   ^__^
       \\  (oo)\\_______
          (__)\\       )\\/\\
              ||----w |
              ||     ||

`
		message.channel.send(`\`\`\`${header + final + footer + COW}\`\`\``)
	}
};

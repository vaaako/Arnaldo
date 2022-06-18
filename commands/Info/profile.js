const { langHandler } = require('../../files/translations/langHandler.js');

const fs = require("fs");
const Canvas = require("canvas");
const { MessageAttachment } = require('discord.js');
const ee = require('../../config/embed.json');


function wrapText(string) {
	if(string.length>35)
		return string.slice(0, 36).trim() + "\n" + string.slice(36).trim();
	else
		return string;
}

const dim = {
	width: 800,
	height: 400
}

const av = {
	x: 10,
	y: 10,
	size: 128,
}

const name = {
	x: av.size+30,
	y: 55
}

var desc = {
	x: name.x,
	y: name.y+50,
}

const triangle = {
	// Up
	x1: 512,
	y1: 65,
	// Down
	x2: 512,
	y2: av.size+25,
	// Right
	x3: 625,
	y3: 65
}


module.exports = {
	name: "profile",
	category: "Info",
	aliases: ["card"],
	usage: "profile [description]",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).info.profile; 

		let user = message.mentions.users.first() || message.author; // Avatar
		let obj = JSON.parse(fs.readFileSync('files/database/profiles.json', 'utf-8'))[user.id]['profile']; // Database

		if(args.join(' ')) {
			if(args.join(' ') == "default") {
				obj['background'] = "files/images/default.jpeg";

				fs.writeFileSync('files/database/profiles.json', JSON.stringify(obj, null, 1));
				return message.reply(LANGUAGE.background);
			}
			obj['description'] = args.join(' ');

			fs.writeFileSync('files/database/profiles.json', JSON.stringify(obj, null, 1)); 
			return message.reply(LANGUAGE.changed);
		}

		
		let attachments = Array.from(message.attachments);
		if(attachments.length>0) {
			obj['background'] = attachments[0][1].url; // Getting attachment url

			fs.writeFileSync('files/database/profiles.json', JSON.stringify(obj, null, 1));
			return message.reply(LANGUAGE.background);
		}
		
		

		let avatarURL = user.displayAvatarURL({format: "png", dynamic: false, size: av.size});
		
		// -> Pre Create <-
		Canvas.registerFont('files/fonts/PAPYRUS.ttf', { family: 'Papyrus' }); // Define font
		// -> Create canvas
		const canvas = Canvas.createCanvas(dim.width, dim.height); // 800x600
		const ctx = canvas.getContext("2d");
	
		// -> Create <-
		let backimg = await Canvas.loadImage(obj['background'])
		ctx.drawImage(backimg, 0, 0); // Draw Background
	
		// -> Draw rect1
		ctx.fillStyle = "rgba(0,0,0,0.7)"
		ctx.fillRect(0, 0, triangle.x1, triangle.y2)
	
		// -> Draw  triangle
		// ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(triangle.x1, triangle.y1);
		ctx.lineTo(triangle.x2, triangle.y2);
		ctx.lineTo(triangle.x3, triangle.y3);
		ctx.lineTo(triangle.x1, triangle.y1);
		ctx.closePath();
		ctx.fill();
		// ctx.stroke();
		// ctx.fillStyle = "rgba(0,0,0,0.7)"
		ctx.fillRect(triangle.x1, 0, triangle.x1, triangle.y1) // Draw rect2
		ctx.fillRect(0, dim.height-30, dim.width, 35); // Draw footer
	
		// -> Draw Avatar image
		const avimg = await Canvas.loadImage(avatarURL);
		ctx.save();

		// -> Circle Avatar
		ctx.beginPath();
		ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(avimg, av.x, av.y);
		ctx.restore();
	
		// -> Font configs
		ctx.fillStyle = "white";
		ctx.textAlign = "left";
		// ctx.font = "40px Papyrus";
		ctx.font = "40px Roboto"; // Username
		ctx.fillText(user.username, name.x, name.y);

		ctx.font = "20px Roboto"; // Description
		ctx.fillText(wrapText(obj['description']), desc.x, desc.y); // Max -> 35


		// -> Sending <-
		const attachment = new MessageAttachment(canvas.toBuffer(), "naldoProfile.png");
		return message.channel.send({ files: [ attachment ] })
	}
};

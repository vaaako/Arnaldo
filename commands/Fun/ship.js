const { langHandler } = require('../../files/translations/langHandler.js');
const { whitelistCheck } = require('../../files/scripts/memberlist-check.js');
const { MessageEmbed } = require('discord.js');
const ee = require('../../config/embed.json');

function loveBarCalculate(lovePercentage) {
	// Math.Ceil -> Flot to int (convert to high)
	let full = Math.ceil((lovePercentage/4)-2); // 1-23 
	var blank = Math.abs(full-22); // If negative, convert to positive

	return `[\`${"█".repeat(full)} ${".".repeat(blank)}\`]`
}

function alwaysHundred(member, member2, author) {
	if(member==member2 || author==member)
		return false;
	// If there is two mentions and the two is in whistelist
	else if( (member && member2) && (whitelistCheck(member.id) && whitelistCheck(member2.id)) )
		return true;
	// If there is only one mention but message.author and the mention is withelist
	else if(whitelistCheck(author) && whitelistCheck(member.id))
		return true;
	else 
		return false;
}

module.exports = {
	name: "ship",
	category: "Amor",
	aliases: ["love", "shipar"],
	usage: "ship <user> [user2]",
	run: async (client, message, args) => {
		const LANGUAGE = langHandler(message).fun.ship;
		let member = message.mentions.users.first();
		let member2 = message.mentions.users.first(2)[1] || null;

		if(!member) 
			return message.channel.send(LANGUAGE.noUser);

		var lovePercentage;
		if(alwaysHundred(member, member2, message.author.id))
			lovePercentage = 100;
		else
			lovePercentage = Math.floor(Math.random() * 101);

		let embed = new MessageEmbed()
			.setTitle(LANGUAGE.EMBED.title.replace("$CALC", lovePercentage.toString()))
			.setDescription(`${loveBarCalculate(lovePercentage)}`)
			.setThumbnail(member.displayAvatarURL({format: "png"}))
			.setImage( (member2) ? member2.displayAvatarURL({ format: "png" }) : null ) // If has member2 then use avatar
			.setColor(ee.color);
		message.channel.send({ embeds: [embed] });

	}
};

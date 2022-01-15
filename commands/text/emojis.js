const { MessageEmbed } = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message) => {

    let normal = "";
    let normalCount = 0;

    let animados = "";
    let animadosCount = 0;

    let emojisTotal = 0;

    function getEmoji(id) {
      return client.emojis.cache.get(id).toString();
		};

    message.guild.emojis.cache.forEach((emoji) => {
      emojisTotal++;
      if(emoji.animated) {
        animadosCount++;
        animados += getEmoji(emoji.id);
      } else {
        normalCount++;
        normal += getEmoji(emoji.id);
      };
    });

    let embed = new MessageEmbed()
			.setAuthor(`Emojis de ${message.guild.name}`, message.guild.iconURL())

			.setDescription(`
			**Padrão [${normalCount}]**\n${normal}\n
			**Animados [${animadosCount}]**\n${animados}\n`)

			.setFooter(`• Emojis Totais [${emojisTotal}]`)
      .setColor(color);

    return message.channel.send(embed);
}

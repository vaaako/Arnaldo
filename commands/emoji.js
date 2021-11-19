const Discord = require('discord.js');

color = 0xDA1354
module.exports.run = async (client, message) => {

    let padrao = "";
    let padraoContador = 0;

    let padraoAnimados = "";
    let animadosContador = 0;

    let totalContador = 0;

    function getEmoji(id) {
      return client.emojis.cache.get(id).toString();
		}

    message.guild.emojis.cache.forEach((emoji) => {
      totalContador++;
      if(emoji.animated) {
        animadosContador++;
        padraoAnimados += getEmoji(emoji.id);
      } else {
        padraoContador++;
        padrao += getEmoji(emoji.id);
      }
    });

    let embed = new Discord.MessageEmbed()
			.setAuthor(`Emojis de ${message.guild.name}`, message.guild.iconURL())

			.setDescription(`
			**Padrão [${padraoContador}]**\n${padrao}\n
			**Animados [${animadosContador}]**\n${padraoAnimados}\n`)

			.setFooter(`• Emojis Totais [${totalContador}]`)
      .setColor(color);

    message.channel.send(embed);
}

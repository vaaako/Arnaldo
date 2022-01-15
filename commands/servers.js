module.exports.run = async(client, message) => {
	if(!message.author.id == '703785252463837234') return
	client.guilds.cache.forEach(guild => {
		message.channel.send(`${guild.name} | ${guild.id}`);
	})

};



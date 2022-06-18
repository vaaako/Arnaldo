module.exports = (client) => {
	console.log(`\n-> Logged in as ${client.user.tag}!\n`);

	// client.user.setStatus('dnd'); // ONLINE, IDLE, DND, INVISIBLE

	setInterval(function(){
		client.user.setActivity('Beta v4.0', { type: 'PLAYING' }), 5000;
		client.user.setActivity('Vulgo Naldinho', { type: 'WATCHING' }), 5000;
	}, 5000);

	// PLAYING
	// STREAMING
	// LISTENING
	// WATCHING
	// COMPETING
};


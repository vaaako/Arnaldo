function getUser(client, message, usuario) {
	if(!usuario) return false
	var usrID = usuario.replace(/[<>@&!']/g, "").replace(/ /g, '');
	try {
		return client.users.cache.get(usrID);
	} catch (e) {
		console.log(e.stack);
		return false
	}
	
}

module.exports.getUser = getUser;
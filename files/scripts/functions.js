const fs = require('fs');
var timeoutArray = [];


module.exports = {

	getUser: function(client, user, id=false) {
		if(!user) return false;
		var user = user.replace(/[<>@&!']/g, "").replace(/ /g, '');

		if(id)
			return client.users.cache.get(user).id;
		else
			return client.users.cache.get(user);
	},

	findKey: function(obj, check) {
		const keys = Object.keys(obj);

		if(keys.includes(check))
			return true;
		else
			return false;
	},

	timeout: function(delay, id, command, message, text){
		function msToTime(s) {
			var ms = s % 1000;
			s = (s - ms) / 1000;
			var secs = s % 60;
			s = (s - secs) / 60;
			var mins = s % 60;
			var hrs = (s - mins) / 60;

			return hrs + ':' + mins + ':' + secs + '.' + ms;
		}

		const user = id;
		const keys = Object.keys(timeoutArray); // aka pegar o users no array

		if(keys.includes(user)) { // Caso já esteja no array
			if(timeoutArray[user].includes(command)) { // Checar se comando está no obj do user (aka em timeout em tal comando)
				return true;
			}
		} else {
			timeoutArray[user] = []; // Caso user não tenha obj no array
		}

		timeoutArray[user].push(command) // Adicionar nome do comand ao obj
		setTimeout(() => {
			message.channel.send(text); 
			timeoutArray[user].splice(timeoutArray[user].indexOf(command)); // Retirar timeout
		}, delay);
		console.log(timeoutArray);

		return false;
	},
};

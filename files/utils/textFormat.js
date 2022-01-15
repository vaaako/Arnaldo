module.exports = {
	capitalize: function(string) {
 		return string.charAt(0).toUpperCase() + string.slice(1);
	},

	clearSpaces: function(string) {
		return string.replace(/ /g, '');
	}
};

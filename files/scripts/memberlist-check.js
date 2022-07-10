const whitelist = [
	"703785252463837234",     // Vako
	"876286395348561951",    // Shy
	"602303260572778516",   // Nashi
	"879037236128149504",  // Isa
	"698338880327385140", // Arzt
	"612375912020967452" // Caio
];

const blacklist = {
	"548609156496752650": "Discurso de ódio" // Mith
};

module.exports = {
	blacklistCheck: function(user) {
		return blacklist[user] // Reason
			? (Object.keys(blacklist).includes(user)) : false
	},
	whitelistCheck: function(user) {
		return true ? (whitelist.includes(user)) : false;
	}
}
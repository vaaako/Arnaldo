var whitelist = [
	"703785252463837234",
	"876286395348561951"
]

function whitelistCheck(usuario) {
	if(whitelist.includes(usuario)) return true
}


module.exports.whitelistCheck = whitelistCheck;
module.exports = {
	name: "error",
	category: "",
	aliases: ["erro"],
	usage: "",
	whitelistOnly: true,
	run: async (client, message) => {
		throw new Error("Este é um erro proposital, feito para testar algum comando");
	}

};
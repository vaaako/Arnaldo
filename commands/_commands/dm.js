module.exports.run = async (client, message, args) => {
	const { getUser } = require('../../files/utils/getUser.js');

	if (!message.member.permissions.has("MANAGE_MESSAGES"))
		return message.channel.send("Você não possui a permissão necessária para usar esse comando.");

	const msg = args.slice(1).join(" ");
	if(!msg) return message.channel.send("Não se esqueça de escrevers")

	const member = await client.users.fetch(args[0]).catch(() => null);

	await message.delete();
	member.send(msg).catch(() => {
		message.channel.send("Mencione um usuário válido");
	});

};

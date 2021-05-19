module.exports = {
	name: 'avatar',
	description: 'Muestra la URL de la imagen de perfil propia o de el usuario etiquetado.',
	aliases: ['icono', 'foto'],
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Tu avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `El avatar de ${user.username}: <${user.displayAvatarURL({ dynamic: true })}>`;
		});

		message.channel.send(avatarList);
	},
};
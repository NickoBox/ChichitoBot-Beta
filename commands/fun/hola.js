module.exports = {
	name: 'hola',
	description: 'El bot te saludara!',
	execute(message, args) {
		if (message.author.username == 'Lu Murga') {
			return message.channel.send('PERO QUE DICE SEÑORAAA?');
		}
		return message.channel.send(`Hola ${message.author}`);
	},
};
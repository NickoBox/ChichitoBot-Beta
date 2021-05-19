module.exports = {
	name: 'hola',
	description: 'El bot te saludara!',
	execute(message, args) {
		message.channel.send(`Hola ${message.author}`);
	},
};
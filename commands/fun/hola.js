module.exports = {
	name: 'hola',
	description: 'El bot te saludara!',
	cooldown: 5,
	execute(message, args) {
		message.channel.send(`Hola ${message.author}`);
	},
};
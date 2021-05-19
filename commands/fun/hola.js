module.exports = {
	name: 'hola',
	aliases: ['saludame', 'hi'],
	description: 'El bot te saludara!',
	cooldown: 5,
	execute(message, args) {
		message.channel.send(`Hola ${message.author}`);
	},
};
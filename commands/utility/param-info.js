module.exports = {
	name: 'param-info',
	description: 'Informacion acerca de los parametros enviados.',
	args: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Parametros: ${args}\nCantidad de Parametros: ${args.length}`);
	},
};
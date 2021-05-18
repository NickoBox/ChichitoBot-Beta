module.exports = {
	name: 'param-info',
	description: 'Informacion acerca de los parametros enviados.',
	execute(message, args) {
		if (!args.length) {
			return message.channel.send(`No has enviado ningun parametro, ${message.author}!`);
		} else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Parametros: ${args}\nLongitud de Parametros: ${args.length}`);
	},
};
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['ayuda', 'comandos', 'commands'],
	usage: '[nombre de comando]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Aquí tienes una lista de mis comandos:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nPuedes usar \`${process.env.PREFIX}help [nombre de comando]\` para obtener informacion especifica de cada comando.`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Te envie un mensaje privaco con todos mis comandos.');
				})
				.catch(error => {
					console.error(`No se pudo enviar DM a ${message.author.tag}.\n`, error);
					message.reply('Parece que no puedo enviarte mensajes privados!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('ese no es un comando valido!');
		}

		data.push(`**Nombre:** ${command.name}`);

		if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descripcion:** ${command.description}`);
		if (command.usage) data.push(`**Modo de uso:** ${process.env.PREFIX}${command.name} ${command.usage}`);

		data.push(`**Enfriamiento:** ${command.cooldown || 3} segundo(s)`);

		message.channel.send(data, { split: true });
	},
};
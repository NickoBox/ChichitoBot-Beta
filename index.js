const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

client.on("ready", () => {
  console.log(`${client.user.tag} inicio corractamente`);
  console.log(`Su estado actual es ${client.user.presence.status}`);
});

//Se añadio soporte para subdirectorios
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    // Con SET agrego un nuevo elemento a la coleccion de comandos
    // donde la clave es el nombre del comando y el valor es el modulo exportado
    client.commands.set(command.name, command);
  }
}

client.on('message', message => {
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  
  const command = client.commands.get(commandName);
  
  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('No puedo ejecutar este comando por mensaje privado.');
  }

  if (command.args && !args.length) {
    let reply = `No has enviado ningun parametro, ${message.author}!`;

    if (command.usage) {
      reply += `\nEste comando deberia usarse asi: \`${prefix}${command.name} ${command.usage}\``;
    }
  
    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Hubo un error al ejecutar el comando.');
	}
});

client.login()
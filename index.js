const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

client.on("ready", () => {
  console.log(`${client.user.tag} inicio corractamente`);
  console.log(`Su estado actual es ${client.user.presence.status}`);
});


// INICIO SISTEMA DE LECTURA DE DIRECTORIOS
  // Se agrego soporte para subdirectorios.
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    // Con SET agrego un nuevo elemento a la coleccion de comandos.
    // donde la clave es el nombre del comando y el valor es el modulo exportado.
    client.commands.set(command.name, command);
  }
}
// FIN SISTEMA DE LECTURA DE DIRECTORIOS

// INICIO SISTEMA DE COMANDOS
client.on('message', message => {
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

  // INICIO PARSEO
    // Estas sentencias analizan los datos enviados y distingue entre comando y parametros (args).
	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  // FIN PARSEO

  // Si el mensaje no es un comando no hagas nada.
  if (!client.commands.has(commandName)) return;
  
  // INICIO ALIAS
  // Se agrego soporte para alias a los comandos.
  // Los alias deben ser siempre arrays de cadenas de texto.
  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
  // FIN ALIAS
  
  // INICIO COMANDO DE SERVER
    // Se agrego soporte para distinguir entre comandos generales y comandos de servidor.
  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('No puedo ejecutar este comando por mensaje privado.');
  }
  // FIN COMANDO DE SERVER

  // INICIO REQUERIR PARAMETROS
  if (command.args && !args.length) {
    let reply = `No has enviado ningun parametro, ${message.author}!`;

    if (command.usage) {
      reply += `\nEste comando deberia usarse asi: \`${prefix}${command.name} ${command.usage}\``;
    }
  
    return message.channel.send(reply);
  }
  // FIN REQUERIR PARAMETROS

  // INICIO COOLDOWN
    // Se agrego soporte para sistemas de coldowns por uso de comando de cada usuario.
    // cooldowns > command > user > timestamp
    // El cooldown se define como una propiedad de cada comando.

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Por favor espera ${timeLeft.toFixed(1)} segundo(s) antes de usar \`${command.name}\` otravez.`);
    }
  }

    // Esta linea hace que la entrada del autor se elimine
    // una vez que haya expirado el tiempo de reutilización.
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  // FIN COOLDOWN

  // INICIO DEBUG
  try {
    command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Hubo un error al ejecutar el comando.');
	}
  // FIN DEBUG

});
// FIN SISTEMA DE COMANDOS

client.login()
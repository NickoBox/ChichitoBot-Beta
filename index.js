const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.tag} inicio corractamente`);
    console.log(`Su estado actual es ${client.user.presence.status}`);
  });

client.on("message", message => {
  if (message.author.bot) return;
  // Filtrado de mensajes por el simbolo identificador de comandos
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;

  // Parseado de argumentos de los comandos
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Comandos de prueba
  if(command === 'hola') {
    message.channel.send(`Hola ${message.author.tag}!`);
  } else
  if (command === 'help') {
    message.channel.send(`Por ahora el unico comando que tengo habilitado es ${process.env.PREFIX}hola`);
  }
});

client.login()
const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.tag} inicio corractamente`);
    console.log(`Su estado actual es ${client.user.presence.status}`);
  });

client.login()
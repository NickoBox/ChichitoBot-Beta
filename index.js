const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('El bot esta en linea!')
})

client.login()
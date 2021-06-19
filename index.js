// require the discord.js module
const Discord = require('discord.js');
require('dotenv').config();
const { prefix } = require('./config.json');
const fs = require('fs');

// create the discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('MEAOW is ready!');
});

client.on('message', function(message) {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
	} catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
	}

});

// login to Discord with your qpp's token
client.login(process.env.TOKEN);
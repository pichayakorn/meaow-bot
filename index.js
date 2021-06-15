// require the discord.js module
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
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
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  else if (command === 'hello') {
    message.channel.send('```yaml\nhello to you too.\n```');
  }

  if (command === 'coin') {
    const exampleEmbed = new Discord.MessageEmbed()
      .setDescription(`${message.author.username} has xx coin`)
      .setColor('#7289da');
    message.channel.send(exampleEmbed);
  }

  if (command === 'rank') {
    const exampleEmbed = new Discord.MessageEmbed()
      .setDescription('Your rank is xxx')
      .setColor('#b12e50');
    message.reply(exampleEmbed);
  }

});

// login to Discord with your qpp's token
client.login(token);
const Discord = require('discord.js');

module.exports = {
    name: 'coin',
    description: 'coin!',
    execute(message, args) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setDescription(`${message.author.username} has xx coin`)
            .setColor('#7289da');
        message.channel.send(exampleEmbed);
    },
};
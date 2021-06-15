module.exports = {
    name: 'hello',
    description: 'hello!',
    execute(message, args) {
        message.channel.send('```yaml\nhello to you too.\n```');
    },
};
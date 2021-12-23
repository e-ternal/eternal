const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    run(client, message, args) {
        message.channel.send('Pinging...')
    .then(m => {
      m.edit(`took \`${m.createdTimestamp - message.createdTimestamp}\` ms`)
    })
    }
}
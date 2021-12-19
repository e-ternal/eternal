const Discord = require('discord.js');

module.exports = {
    name: "guildicon",
    description: "pulls server icon",
    run: (client, message, args) => {

const guildicon = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setImage(message.guild.iconURL({size: 2048, dynamic: true }))
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    message.channel.send({ embeds: [guildicon] })
    }
}
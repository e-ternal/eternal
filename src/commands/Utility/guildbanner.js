const Discord = require('discord.js');

module.exports = {
    name: "guildbanner",
    description: "pulls server banner",
    run: (client, message, args) => {

const guildbanner = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setImage(message.guild.bannerURL({size: 2048, dynamic: true }))
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
  .setTimestamp()
  message.channel.send({ embeds: [guildbanner] })
    }
}
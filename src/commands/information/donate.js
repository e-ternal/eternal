const Discord = require('discord.js');

module.exports = {
    name: "donate",
    description: "fun commands",
    run: (client, message, args) => {

const embedhelp = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setAuthor(`donate to ${client.user.username}`, client.user.displayAvatarURL())
    .setDescription("all funds go to bot hosting and other cool stuff!")
    .addField(`**paypal**`, "jackson@crime.su")
    .addField(`**cashapp**`, "$jpasjax")
    .addField(`**btc**`, "bc1qp6zu2wfvg56gr6etgva8y0e5fgzuaktwfuj42g")
    .addField(`**eth**`, "0xA1c0E1e777EC75ca2727b735E8fBC5DC702499bb")
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
     message.channel.send({ embeds: [embedhelp] })
    }
}
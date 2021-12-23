const Discord = require('discord.js');

module.exports = {
  name: "invite",
  aliases: ["inv"],
  category: "information",

  run: async (client, message, args) => {

    const inviteEmbed = new Discord.MessageEmbed()
      .setDescription(`invite ${client.user.username} [__here__](https://discord.com/api/oauth2/authorize?client_id=745743723496996864&permissions=8&scope=bot)`)
      .setColor("#2f3136")
      .setFooter(`bot will be removed if not authorized`, message.author.displayAvatarURL({
        dynamic: true
    }))
    return message.channel.send({ embeds: [inviteEmbed] })
  }
}
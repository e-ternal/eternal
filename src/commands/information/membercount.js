const Discord = require('discord.js');

module.exports = {
  name: "membercount",
  aliases: ["mc"],
  category: "information",

  run: async (client, message, args) => {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;
    
    const botCount = message.guild.members.cache.filter(m => m.user.bot).size;

    const membercountEmbed = new Discord.MessageEmbed()
      .setColor(`#2f3136`)
      .setThumbnail(message.guild.iconURL({size: 2048, dynamic: true }))
      .setAuthor(`${message.guild.name} statistics`, message.guild.iconURL({
        dynamic: true
      }))
      .setTimestamp()
      .addFields(
        {
          name: "**users**",
          value: `${message.guild.memberCount}`,
          inline: true
        },
        {
          name: "**humans**",
          value: `${message.guild.memberCount - botCount}`,
          inline: true
        },

        {
          name: "**bots**",
          value: `${botCount}`,
          inline: true
        },
      )

      message.channel.send({ embeds: [membercountEmbed] })
  }
}
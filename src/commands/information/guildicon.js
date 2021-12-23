const Discord = require('discord.js');

module.exports = {
  name: "guildicon",
  aliases: ["gicon", "servericon"],

  run: async (client, message, args) => {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;

    const iconEmbed = new Discord.MessageEmbed()

      .setColor('#2f3136')
      .setTitle(`${message.guild.name}'s guild icon`)
      .setImage(message.guild.iconURL({
        dynamic: true,
        format: "png",
        size: 2048
      }))

      message.channel.send({ embeds: [iconEmbed] })
    }
}
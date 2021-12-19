const Discord = require('discord.js');

module.exports = {
  name: "guildbanner",
  aliases: ["gbanner", "serverbanner"],
  category: "utility",

  run: async (client, message, args) => {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;

    const bannerEmbed = new Discord.MessageEmbed()

      .setColor('#2f3136')
      .setTitle(`${message.guild.name}'s guild banner`)
      .setImage(message.guild.bannerURL({
        dynamic: true,
        format: "png",
        size: 2048
      }))

      message.channel.send({ embeds: [bannerEmbed] })
    }
}
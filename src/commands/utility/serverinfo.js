const Discord = require('discord.js');
const moment = require('moment');
const ms = require('ms');

module.exports = {
  name: "serverinfo",
  aliases: ["si"],
  category: "information",

  run: async (client, message, args) => {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;

    const botCount = message.guild.members.cache.filter(m => m.user.bot).size;
    const humanCount = message.guild.memberCount - botCount
    const { guild } = message
    const emojicount = message.guild.emojis.cache
    const roles = message.guild.roles.cache
    const create = `${moment(message.guild.createdAt).format("MMM Do YYYY")} (${ms(Date.now() - message.guild.createdAt, { long: true })})`

    let banner = message.guild.bannerURL({ dynamic: true, format: "png", size: 2048 })
    if (banner) {
      banner = `[click here](${message.guild.bannerURL({ dynamic: true, format: "png", size: 2048 })})`
    } else {
      banner = 'N/A'
    }

    let splash = message.guild.splashURL({ dynamic: true, format: "png", size: 2048 })
    if (splash) {
      splash = `[click here](${message.guild.splashURL({ dynamic: true, format: "png", size: 2048 })})`
    } else {
      splash = 'N/A'
    }

    let icon = message.guild.iconURL({ dynamic: true, format: "png", size: 2048 })
    if (icon) {
      icon = `[click here](${message.guild.iconURL({ dynamic: true, format: "png", size: 2048 })})`
    } else {
      icon = 'N/A'
    }

    let vanity = message.guild.vanityURLCode
    if (vanity) {
      vanity = `(discord.gg/${message.guild.vanityURLCode})`
    } else {
      vanity = ''
    }

    let features = [];

    guild.features.forEach(feature => {
      features.push(
        feature
          .toLowerCase()
          .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
          .replace(/_/g, " ")
          .replace(/Guild/g, "Server")
          .replace(/Use Vad/g, "Use Voice Acitvity")
      );
    });

    const verificationLevels = {
      NONE: 'None',
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: 'High',
      VERY_HIGH: 'Highest'
    };


    const embed = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTitle(`${guild.name} ${vanity} ${message.guild.verified ? `${verifiedServer}` : ``}`)
      .setDescription(`server created on __${create}__\n__${guild.name}__ is on bot shard ID: **${guild.shardID}/${guild.shardID}**`)
      .setThumbnail(message.guild.iconURL({
        dynamic: true,
        format: "png",
        size: 2048
      }))
      .setFooter(`guild id: ${guild.id}`)
      .setTimestamp()
      .addFields({
        name: "**owner**",
        value: guild.ownerId,
        inline: true,
      },
        {
          name: "**members**",
          value: `**total:** ${guild.memberCount}\n**humans:** ${humanCount}\n**bots:** ${botCount}`,
          inline: true,
        },
        {
          name: "**information**",
          value: `**region:** ${guild.region}\n**verification:** ${verificationLevels[guild.verificationLevel]}\n**level:** ${guild.premiumTier}/${guild.premiumSubscriptionCount} boosts`,
          inline: true,
        },
        {
          name: "**design**",
          value: `**banner:** ${banner}\n**splash:** ${splash}\n**icon:** ${icon}`,
          inline: true,
        },
        {
          name: `**channels (${guild.channels.cache.size})**`,
          value: `**text:** ${guild.channels.cache.filter(channel => channel.type == 'text').size}\n**voice:** ${guild.channels.cache.filter(channel => channel.type == 'voice').size}\n**category:** ${guild.channels.cache.filter(channel => channel.type == 'category').size}`,
          inline: true,
        },
        {
          name: "**other**",
          value: `**roles:** ${roles.size}/250\n**emojis:** ${emojicount.size}/250`,
          inline: true,
        },
        {
          name: "**features**",
          value: features.length
            ? features
              .map(feature => `\`${feature}\``)
              .join(", ")
            : "N/A",
          inline: true
        })

    message.channel.send({ embeds: [embed] });
  }
}
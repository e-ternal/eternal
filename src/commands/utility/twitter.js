const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const twitter = require('twitter-api.js');

module.exports = {
  name: "twitter",
  aliases: ['twit'],

  run: async (client, message, args) => {
    let user = args[0];
    const twitterEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({
      dynamic: true
    }))
    .setTitle('twitter')
    .setDescription('check a twitter account profile')
    .addField('**usage**', '\`\`\`syntax: twitter (user) \n\`\`\`')
    .addField('**aliases**', 'twit', true)
    .setTimestamp()
    .setColor("#2f3136")
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
    if (!args[0]) return message.channel.send({ embeds: [twitterEmbed] });

    try {
      const body = await twitter.users(user);
      const tweet = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setURL(`https://twitter.com/${body.screen_name}`)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({
          dynamic: true,
          size: 2048
        }))
        .setTitle(
          `${body.name} (@${body.screen_name.toLocaleString()})`,
          body.verified
            ? 'https://emoji.gg/assets/emoji/6817_Discord_Verified.png'
            : null
        )
        .setDescription(
          stripIndents` ${body.description}`)
        .setFooter(
          `Twitter ID: ${body.id}`,
          'https://abs.twimg.com/favicons/twitter.ico'
        )
        .setThumbnail(body.profile_image_url_https.replace('_normal', ''))
        .addFields(
          {
            name: "**tweets**",
            value: `${body.statuses_count.toLocaleString()}`,
            inline: true
          },
          {
            name: "**following**",
            value: `${body.friends_count.toLocaleString()}`,
            inline: true,
          },
          {
            name: "**followers**",
            value: `${body.followers_count.toLocaleString()}`,
            inline: true,
          }
        )

      message.channel.send({ embeds: [tweet] });
    } catch (e) {
      if (e.status === 403) {
        let error2 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalError:921857438502756434>  ${message.author}:  That user is either **suspended** or is on **private mode**`)
        return message.reply({ embeds: [error2] })
         } else if (e.status === 404) {
            let error3 = new Discord.MessageEmbed()
            .setColor('#2F3136')
            .setDescription(`<:eternalError:921857438502756434>  ${message.author}:  That **user** doesn't exist**`)
            return message.reply({ embeds: [error3] })
        } else return message.channel.send(`**Unknown Error:** \`${e.message}\``);
    }
  }
};
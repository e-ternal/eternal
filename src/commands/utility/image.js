const Discord = require('discord.js');
const gis = require('g-i-s');

module.exports = {
  name: "image",
  aliases: ["im", "img"],

  run: async (client, message, args) => {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mentionedMember) mentionedMember = message.member;

    let googleIcon = 'https://maxcdn.icons8.com/Share/icon/Logos//google_logo1600.png';

    const embed = new Discord.MessageEmbed()
    .setTitle('image')
    .setDescription('Search google for an image')
    .addField('**usage**', '\`\`\`syntax: image <search>\`\`\`')
    .addField('**aliases**', 'im, img', true)
    .setTimestamp()
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
    .setColor(`#2f3136`)
  if (!args[0]) return message.channel.send({ embeds: [embed] })
    const filter = (reaction, user) => user.id === message.author.id && (reaction.emoji.name === '⬅️' || reaction.emoji.name === '➡️');
    let page = 0
    let reactionTrigger = 0;
    let search = message.content.substring(message.content.indexOf(' ') + 1, message.content.length) || null;
    if (!search) {
        let error1 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  enter a search term`)
        return message.reply({ embeds: [error1] })
    };
    async function reactionCatcher(msg) {
      var removeAll = setTimeout(function () {
        msg.reactions.removeAll();
      }, 60000)
      msg.awaitReactions(filter, { max: 1, time: 60000 }).then(collected => {
        if (collected) {
          if (collected.first().emoji.name === '➡️') {
            page++
            clearTimeout(removeAll);
            msg.reactions.removeAll()
            updateImg(msg);
          }
          if (collected.first().emoji.name === '⬅️') {
            page--
            clearTimeout(removeAll);
            msg.reactions.removeAll()
            updateImg(msg);
          }
        }
      });
    };
    async function generateReactions(msg) {
      if (page + 1 > 1 && page + 1 < 100) {
        msg.react('⬅️');
        setTimeout(function () {
          msg.react('➡️');
        }, 750)
      } else if (page == 0) {
        msg.react('➡️');
      } else if (page + 1 == 100) {
        msg.react('⬅️');
      }
      if (reactionTrigger !== 0) {
        reactionCatcher(msg)
      }
    };

    async function updateImg(msg) {
      gis(search, logResults);
      function logResults(error, results) {
        if (error) {
          console.log(error)
        }
        else {
          if (msg == null) {
            var embed = new Discord.MessageEmbed()
              .setColor(`#2f3136`)
              .setAuthor(message.author.username, message.author.avatarURL({
                dynamic: true
              }))
              .setTitle(`**Search Results for ${search}**`)
              .setImage(results[page].url)
              .setFooter(`${page + 1}/${results.length} of Google Image Search Results (Random)`, googleIcon);
            message.channel.send({ embeds: [embed] }).then(msg => {
              generateReactions(msg);
              reactionCatcher(msg);
            });
          } else {
            var embed = new Discord.MessageEmbed()
              .setColor(`#2f3136`)
              .setAuthor(message.author.username, message.author.avatarURL({
                dynamic: true
              }))
              .setTitle(`**Search Results for ${search}**`)
              .setImage(results[page].url)
              .setFooter(`${page + 1}/${results.length} of Google Image Search Results (Random)`, googleIcon);
            msg.edit({ embeds: [embed] })
            setTimeout(function () {
              generateReactions(msg)
              reactionCatcher(msg)
            }, 300)

          }
        }

      }
    }
    updateImg(null);
  }
};
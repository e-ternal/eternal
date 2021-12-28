const Discord = require('discord.js');

module.exports = {
  name: "sendembed",
  aliases: ["se"],
  userPermissions: ['MANAGE_MESSAGES'],

  run: async (client, message, args) => {

    const ceEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL({
        dynamic: true
      }))
      .setTitle('sendembed')
      .setDescription('send your own embed\n')
      .addField('**usage**', '\`\`\`syntax: sendembed <json code>\n\`\`\`')
      .addField('**permissions**', `MANGAGE_MESSAGES`, true)
      .addField('**aliases**', 'se', true)
      .setTimestamp()
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
      .setColor("#2f3136")
    if (!args[0]) return message.channel.send({ embeds: [ceEmbed] })
    try {
      const json = JSON.parse(args.join(' '))
      const { text = '' } = json

      if ({}.hasOwnProperty.call(json, "thumbnail")) {
        json.thumbnail = { url: json.thumbnail };
      }
      if ({}.hasOwnProperty.call(json, "image")) {
        json.image = { url: json.image };
      }

      message.channel.send(text, {
        embed: json
      })
    } catch (e) {
        let error1 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}: ${e.message}`)
      message.channel.send({ embeds: [error1] })
    }
  }
}
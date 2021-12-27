const Discord = require('discord.js')

module.exports = {
  name: "unlock",
  userPermissions: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],

  run: async (client, message, args) => {

    const channel = message.mentions.channels.first() || message.channel;

    const lockEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL({
        dynamic: true
      }))
      .setTitle('unlock')
      .setDescription('Unlock a channel')
      .addField('**Usage**', '\`\`\`Syntax: unlock <channel>\`\`\`')
      .addField('**Permissions**', `BAN_MEMBERS`, true)
      .setTimestamp()
      .setColor("#2f3136")
    if (!args[0]) return message.channel.send({ embeds: [lockEmbed] })

    if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === true) {
      const unlockchannelError2 = new Discord.MessageEmbed()
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}: ${channel} is not locked`)
        .setColor('#2f3136');

      return message.channel.send({ embeds: [unlockchannelError2] });
    }

    channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true });

    const embed = new Discord.MessageEmbed()
      .setDescription(`:unlock: ${message.author}: ${channel} unlocked - make sure to check permissions if hidden`)
      .setColor('#2f3136');

    message.channel.send({ embeds: [embed] });
  }

};
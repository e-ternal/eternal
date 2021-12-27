const Discord = require('discord.js');

module.exports = {
  name: "lockdown",
  aliases: ["lock"],
  userPermissions: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],

  run: async (client, message, args) => {

    const lockEmbed = new Discord.MessageEmbed()
    .setTitle('lockdown')
    .setDescription('lockdown a channel')
    .addField('**usage**', '\`\`\`syntax: lockdown <channel>\n`\`\`')
    .addField('**permissions**', `BAN_MEMBERS`, true)
    .addField('**aliases**', 'lock', true)
    .setTimestamp()
    .setColor("#2f3136")
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
      if (!args[0]) return message.channel.send({ embeds: [lockEmbed] })

    let channel = message.mentions.channels.first();

    if (channel) {
      reason = args.join(' ').slice(22) || 'Not Specified';
    } else {
      channel = message.channel;
    }

    if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === false) {
      const lockchannelError2 = new Discord.MessageEmbed()
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}: ${channel} is already locked`)
        .setColor('#2f3136');

      return message.channel.send({ embeds: [lockchannelError2] });
    }

    channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false });

    const embed = new Discord.MessageEmbed()
      .setDescription(`:lock: ${message.author}: ${channel} locked. Use \`;unlock\` to remove this lockdown`)
      .setColor('#2f3136');

    message.channel.send({ embeds: [embed] });
  }

};
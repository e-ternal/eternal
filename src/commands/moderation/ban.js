const Discord = require('discord.js');

module.exports = {
  name: "ban",
  userPermissions: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],

  run: async (client, message, args) => {

    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!reason) reason = 'no reason supplied';
    const embed = new Discord.MessageEmbed()
      .setTitle('ban')
      .setDescription('bans the mentioned user from the guild')
      .addField('**usage**', '\`\`\`;ban (member) \n\`\`\`')
      .addField('**permissions**', `BAN_MEMBERS`, true)
      .setColor("#2f3136")
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
    if (!args[0]) return message.channel.send({ embeds: [embed] })
    if (!mentionedMember) {
      let error1 = new Discord.MessageEmbed()
            .setColor('#2F3136')
            .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  **Invalid User**. Do \`;ban\` to see the variables`)
            return message.reply({ embeds: [error1] })
    } if (!mentionedMember.bannable) {
      let error2 = new Discord.MessageEmbed()
      .setColor('#2F3136')
      .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  Cannot ban due to **hierarchy**`)
      return message.reply({ embeds: [error2] })
    } 

    const banEmbed = new Discord.MessageEmbed()
    .setTitle('**ban**')
    .addField(`**you have been banned in**`, `${message.guild.name}`, true)
    .addField(`**moderator**`, `${message.author.tag}`, true)
    .addField(`**reason**`, `${reason}`, true)
    .setColor("#2f3136")
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
    .setTimestamp()

    await mentionedMember.send({ embeds: [banEmbed] }).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send(`👍`))
  }
}
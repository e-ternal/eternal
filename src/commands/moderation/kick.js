const Discord = require('discord.js');

module.exports = {
  name: "kick",
  userPermissions: ["KICK_MEMBERS"],
  botPermissions: ["KICK_MEMBERS"],

  run: async (client, message, args) => {

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "no reason supplied"
    const kickEmbed = new Discord.MessageEmbed()
      .setTitle('**kick**')
      .addField(`**you have been kicked from**`, `${message.guild.name}`, true)
      .addField(`**moderator**`, `${message.author.tag}`, true)
      .addField(`**reason**`, `${reason}`, true)
      .setColor("#2f3136")
      .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
      .setTimestamp()
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL())

    //,kick @user [reason]
    const embed = new Discord.MessageEmbed()
      .setTitle('kick')
      .setDescription('kicks the mentioned user from the guild')
      .addField('**usage**', '\`\`\`syntax: kick (member) <reason>\n\`\`\`')
      .addField('**permissions**', `KICK_MEMBERS`, true)
      .setTimestamp()
      .setColor("#2f3136")
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
    if (!args[0]) return message.channel.send({ embeds: [embed] })
    if (!mentionedMember) {
        let error1 = new Discord.MessageEmbed()
            .setColor('#2F3136')
            .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  **Invalid User**. Do \`;kick\` to see the variables`)
            return message.reply({ embeds: [error1] })
     } if (!mentionedMember.kickable) {
        let error2 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  Cannot kick due to **hierarchy**`)
        return message.reply({ embeds: [error2] })
      } try {
      await mentionedMember.send({ embeds: [kickEmbed] });
    } catch (err) {
      return message.channel.send('Cannot message that user');
    }

    try {
      await mentionedMember.kick(reason)
      return message.channel.send('👍')
    } catch (err) {
      console.log(err);
    }

  }
}
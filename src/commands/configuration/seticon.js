const Discord = require('discord.js')

module.exports = {
  name: "seticon",
  userPermissions: ['MANAGE_GUILD'],
  botPermissions: ['MANAGE_GUILD'],

  run: async (client, message, args) => {
    let icon = args[0]
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL({
        dynamic: true
      }))
      .setTitle('seticon')
      .setDescription('sets a new guild icon')
      .addField('**usage**', '\`\`\`syntax: seticon (url)\n\`\`\`')
      .addField('**permissions**', `MANAGE_GUILD`, true)
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
      .setColor("#2f3136")
    if (!icon) return message.channel.send({ embeds: [embed] })

    if (message.attachments.first()) {
      icon = message.attachments.first().url
      message.guild.setIcon(icon).then(() => {
        let approved = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalSuccess:921857405447454761> ${message.author}: successfully set the guild icon to [**this image**](${icon})` )
        return message.reply({ embeds: [approved] })
      })
    } else {
      if (!icon) {
        let warning = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}: you must provide a valid url or an attachment to set as the icon`)
        return message.reply({ embeds: [warning] })
      } 
      message.guild.setIcon(icon).then(() => {
        let approved2 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalSuccess:921857405447454761> ${message.author}: successfully set the guild icon to [**this image**](${icon})` )
        return message.reply({ embeds: [approved2] })
      })
      try {
    } catch (e) {
      console.log(e)
      const errorEmbed = new MessageEmbed()
      .setColor('#2F3136')
      .setDescription(`<:eternalError:921857438502756434> ${message.author}: there was an **error** when executing **${module.exports.name}**`)
      return message.reply({ embeds: [errorEmbed] })
  }
  } 
} }
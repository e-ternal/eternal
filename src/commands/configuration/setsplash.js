const Discord = require('discord.js')

module.exports = {
  name: "setsplash",
  userPermissions: ['MANAGE_GUILD'],
  botPermissions: ['MANAGE_GUILD'],

  run: async (client, message, args) => {
    if (!message.guild.features.includes("SPLASH")) {
        let error1 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalError:921857438502756434> ${message.author}:  setting a spalsh screen requires a \`level 1\` guild`)
        return message.reply({ embeds: [error1] })
    }
    let splash

    const embed = new Discord.MessageEmbed()
      .setTitle('setsplash')
      .setDescription('Set a new guild splash')
      .addField('**usage**', '\`\`\`syntax: setsplash (url)\n\`\`\`')
      .addField('**permissions**', `MANAGE_GUILD`, true)
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
      .setColor("#2f3136")
    if (!splash) return message.channel.send({ embeds: [embed] })

    if (message.attachments.first()) {
      splash = message.attachments.first().url
      message.guild.setSplash(splash).then(() => {
        let approved = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalSuccess:921857405447454761> ${message.author}: successfully set the guild splash to [**this image**](${splash})` )
        return message.reply({ embeds: [approved] })
      })
    } else {
      splash = args[0]
      if (!splash) {
        let warning = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}: you must provide a valid url or an attachment to set as the splash screen`)
        return message.reply({ embeds: [warning] })
      } 
      message.guild.setSplash(splash).then(() => {
        let approved2 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalSuccess:921857405447454761> ${message.author}: successfully set the guild splash to [**this image**](${splash})` )
        return message.reply({ embeds: [approved2] })
      })
    }
  }
}
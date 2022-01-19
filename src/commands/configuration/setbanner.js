const Discord = require('discord.js')

module.exports = {
  name: "setbanner",
  userPermissions: ['MANAGE_GUILD'],
  botPermissions: ['MANAGE_GUILD'],

  run: async (client, message, args) => {
    if (!message.guild.features.includes("BANNER")) {
        let error1 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalError:921857438502756434> ${message.author}:  setting a banner requires a \`level 2\` guild`)
        return message.reply({ embeds: [error1] })
    } 
    let banner

    const embed = new Discord.MessageEmbed()
      .setTitle('setbanner')
      .setDescription('sets a new guild banner')
      .addField('**usage**', '\`\`\`syntax: ;setbanner (url)\n\`\`\`')
      .addField('**permissions**', `MANAGE_GUILD`, true)
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
      .setColor("#2f3136")
    if (!banner) return message.channel.send(embed)

    if (message.attachments.first()) {
      banner = message.attachments.first().url
      message.guild.setBanner(banner).then(() => {
        let approved = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalSuccess:921857405447454761> ${message.author}: successfully set the guild banner to [**this image**](${banner})`)
        return message.reply({ embeds: [approved] })
      })
    } else {
      banner = args[0]
      if (!banner) {
        let warning = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}: you must provide a valid url or an attachment to set as the guild banner`)
        return message.reply({ embeds: [warning] })
      } 
      message.guild.setBanner(banner).then(() => {
        let approved2 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalSuccess:921857405447454761> ${message.author}: successfully set the guild banner to [**this image**](${banner})`)
        return message.reply({ embeds: [approved2] })
      })
    }
  }
}
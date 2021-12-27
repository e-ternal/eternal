const Discord = require('discord.js');

module.exports = {
  name: "purge",
  aliases: ["clear", "prune", "c"],
  userPermissions: ["MANGAGE_MESSAGES"],
  botPermissions: ["MANGAGE_MESSAGES"],

  run: async (client, message, args) => {
   
    const purgehelpEmbed = new Discord.MessageEmbed()
      .setTitle('purge')
      .setDescription('deletes the specified amount of messages from the current channel')
      .addField('**usage**', '\`\`\`syntax: purge <amount>\n\`\`\`')
      .addField('**permissions**', `MANAGE_MESSAGES`, true)
      .addField('**aliases**', 'clear, prune, c', true)
      .setTimestamp()
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
      .setColor("#2f3136")
    if (!args[0]) return message.channel.send({ embeds: [purgehelpEmbed] });
    const amountToDelete = Number(args[0], 10);
    if (isNaN(amountToDelete)) {
        let error1 = new Discord.MessageEmbed()
            .setColor('#2F3136')
            .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  make sure you put in a number. do \`purge\` to see the variables`)
            return message.reply({ embeds: [error1] }) 
    } if (!Number.isInteger(amountToDelete)) {
        let error2 = new Discord.MessageEmbed()
            .setColor('#2F3136')
            .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  make sure you put in a number and not an integer. do \`purge\` to see the variables`)
            return message.reply({ embeds: [error2] })
    } if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) {
        let error3 = new Discord.MessageEmbed()
            .setColor('#2F3136')
            .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  invalid amount. make sure it is between **2-100**`)
            return message.reply({ embeds: [error3] })
    } const fetched = await message.channel.messages.fetch({
      limit: amountToDelete
    });

    try {
      await message.channel.bulkDelete(fetched)
      let purge = new Discord.MessageEmbed()
      .setColor('#2F3136')
      .setDescription(`<:eternalSuccess:921857405447454761> ${message.author}: purged **${fetched.size}** messages 👍`)
      return message.channel.send({ embeds: [purge] }).then(msg => {
        msg.delete({ timeout: 15000 })
      })
    } catch (err) {
      console.log(err);
      let errorEmbed = new Discord.MessageEmbed()
      .setColor('#2F3136')
      .setDescription(`<:eternalError:921857438502756434> ${message.author}: unable to purge messages`)
      return message.reply({ embeds: [errorEmbed] })
    }
  }
}
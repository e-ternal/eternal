const Discord = require('discord.js');

module.exports = {
  name: "role",
  userPermissions: ['MANAGE_ROLES'],
  botPermissions: ['MANAGE_ROLES'],

  run: async (client, message, args) => {

     const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name === args.slice(1).join(' '));

  if (!args[0]) {
    const rolehelpEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({
      dynamic: true
    }))
    .setTitle('role')
    .setDescription('add/remove a role from a member')
    .addField('**subcommands**', "`add`, `create`, `remove`")
    .addField('**usage**', '\`\`\`syntax: role (member) <role name>\n\`\`\`')
    .addField('**permissions**', `MANAGE_ROLES`, true)
    .setTimestamp()
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
    .setColor("#2f3136")
  return message.channel.send({ embeds: [rolehelpEmbed] })
  }
  
  if (args[0] === 'add') {
    if (!mentionedMember) {
        let error1 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  you must state a **user** to give the role to`)
        return message.reply({ embeds: [error1] })
    } if (mentionedMember.roles.highest.position > message.member.roles.highest.position) {
        let error2 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalError:921857438502756434>  ${message.author}:  you cannot give a role that is **higher** than **yours**`)
        return message.reply({ embeds: [error2] })
    } if (!args[0]) {
        let error3 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  you must **state** a valid role`)
        return message.reply({ embeds: [error3] })
    } if (!role) {
        let error4 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  that role **doesn't** exist, state a valid role`)
        return message.reply({ embeds: [error4] })
    } if (message.member.roles.highest.position <= role.position) {
        let error5 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalError:921857438502756434> ${message.author}:  you **cannot** give a role thats higher than yours`)
        return message.reply({ embeds: [error5] })
    } 

    await mentionedMember.roles.add(role.id).catch(err => console.log(err))
    const rolegiveEmbed = new Discord.MessageEmbed()
      .setDescription(`<:eternalAdd:921913037252878416>  ${message.author}: Added ${role} to ${mentionedMember}`)
      .setColor('#2F3136')
    return message.channel.send({ embeds: [rolegiveEmbed] })
  }
  if (args[0] === 'remove') {
  }
  }
}
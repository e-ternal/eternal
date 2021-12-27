const Discord = require('discord.js');

module.exports = {
  name: "inrole",
  aliases: ["members"],
  userPermissions: ['MANAGE_ROLES'],
  botPermissions: ['MANAGE_ROLES'],

  run: async (client, message, args) => {
    if (args.includes("@everyone")) return;

    if (args.includes("@here")) return;

    const inroleEmbed = new Discord.MessageEmbed()
      .setTitle('inrole')
      .setDescription('views members inside a role')
      .addField('**usage**', '\`\`\`Syntax: inrole <role>\`\`\`')
      .addField('**aliases**', 'members', true)
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
      .setColor(`#2f3136`)
    if (!args[0]) return message.channel.send({ embeds: [inroleEmbed] })

    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
    if (!role) {
    let embed1 = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setDescription(`<:eternalWarn:873633376114995280> ${message.author}: you need to enter a **valid** role`)
    return message.reply({
      embeds: [embed1] 
  })
    } 

    let membersWithRole = message.guild.members.cache.filter(member => {
      return member.roles.cache.find(r => r.name === role.name);
    }).map(member => {
      return member.user.tag;
    })
    if (membersWithRole > 2048) return message.channel.send('list is too long')

    let roleListEmbed = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({
        dynamic: true,
        size: 2048
      }))
      .setTitle(`members in '${role.name}'`)
      .setDescription(`**${membersWithRole.join("\n")}**`);
    message.channel.send({ embeds: [roleListEmbed] })
  }
}
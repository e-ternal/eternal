const Discord = require('discord.js');

module.exports = {
  name: "unban",
  category: "moderation",
  userPermissions: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],

  run: async (client, message, args) => {

    let reason = args.slice(1).join(" ");
    let userID = args[0];

    if (!reason) reason = 'no reason given.';
    const ubhelpEmbed = new Discord.MessageEmbed()
      .setTitle('unban')
      .setDescription('unbans the mentioned user from the guild')
      .addField('**usage**', '\`\`\`syntax: unban (member) <reason>\n\`\`\`')
      .addField('**permissions**', `BAN_MEMBERS`, true)
      .setColor("#2f3136")
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
    if (!args[0]) return message.channel.send({ embeds: [ubhelpEmbed] })
    if (isNaN(args[0])) return message.channel.send({ embeds: [ubhelpEmbed] })
    message.guild.bans.fetch().then(async bans => {
      if (bans.size == 0) return message.channel.send({ embeds: { color: "#2f3136", description: `<:eternalWarn:873633376114995280> ${message.author}: Couldn't find any bans for this guild`}});
      let bUser = bans.find(b => b.user.id == userID);
      if (!bUser) return message.channel.send({ embeds: { color: "#2f3136", description: `<:eternalError:921857438502756434>  ${message.author}: Couldn't find a ban for: **${userID}**` } })
      await message.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err);
        return message.channel.send({ embeds: { color: "#2f3136", description: `<:eternalWarn:873633376114995280> ${message.author}: Something went wrong **unbanning** that ID` } });
      }).then(() => {
        message.channel.send('👍')
      })
    })
  }
}
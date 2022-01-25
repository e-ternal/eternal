const Discord = require('discord.js');

module.exports = {
  name: "poll",
  aliases: ["createpoll"],
  category: "utility",
  userPermissions: ['MANAGE_MESSAGES'],
  botPermissions: ['EMBED_LINKS'],

run: async(client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

  const pollEmbed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL({
    dynamic: true
  }))
  .setTitle('poll')
  .setDescription('create a poll')
  .addField('**usage**', '\`\`\`syntax: ;poll <question>\`\`\`')
  .addField('**permissions**', `EMBED_LINKS`, true)
  .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
  .setColor("#2f3136")
if(!args[0]) return message.channel.send({ embeds: [pollEmbed] });
  let msg = args.slice(0).join(' ');

  let embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setTitle(`__**poll**__`)
    .setDescription(`${msg}`)
    .setAuthor(`poll created by: ${message.author.username}`, message.author.displayAvatarURL({
      dynamic: true,
      size: 2048
    }))
    .setTimestamp()
    .setFooter(`${message.guild.me.displayName}`);
      
  message.delete();

  message.channel.send({ embeds: [embed] }).then(messageReaction => {
    messageReaction.react('👍');
    messageReaction.react('👎');
  });
}
}
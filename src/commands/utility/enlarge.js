const Discord = require('discord.js');
const { parse } = require("twemoji-parser");

module.exports = {
    name: "enlarge",
    description: "enlarge mentioned emoji",
    run: async (client, message, args) => {

      const emoji = args[0];
        const rolehelpEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({
      dynamic: true
    }))
    .setTitle('enlarge')
    .setDescription('enlarges selected emoji')
    .addField('**usage**', '\`\`\`syntax: enlarge <emoji> \n\`\`\`')
    .setTimestamp()
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
    .setColor("#2f3136")
  if (!args[0]) return message.channel.send({ embeds: [rolehelpEmbed] })

    let custom = Discord.Util.parseEmoji(emoji);
    const embed = new Discord.MessageEmbed()
    
    .setColor("#2f3136");

    if (custom.id) {
        embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
        return message.channel.send({ embeds: [embed] });
    }
    else {
        let parsed = parse(emoji, { assetType: "png" });
        if (!parsed[0]) {
            let error = new MessageEmbed()
                    .setColor('#2F3136')
                    .setDescription(`<:eternalWarn:873633376114995280> ${message.author}: invalid emoji`)
                    return message.reply({ embeds: [error] })
        } embed.setImage(parsed[0].url);
        return message.channel.send({ embeds: [embed] });
    }

    }
}
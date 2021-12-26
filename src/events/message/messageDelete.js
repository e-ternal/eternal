const client = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {

 if (message.content.includes(';purge')) return;
        if (message.author.bot) return;
        const snipes = message.client.snipes.get(message.channel.id) || [];
        snipes.unshift({
          content: message.content,
          author: message.author,
          image: message.attachments.first()
            ? message.attachments.first().proxyURL
            : null,
          date: new Date().toLocaleString("en-GB", {
            dataStyle: "full",
            timeStyle: "short",
          }),
        });
        snipes.splice(10);
        message.client.snipes.set(message.channel.id, snipes);
        let embed = new MessageEmbed()
          .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
          .setDescription(`**deleted message**\n\n**user:** ${message.author.tag} (\`\`${message.author.id}\`\`)\n**channel:** <#${message.channel.id}>`)
          .addField(`message`, message.content, true)
          .setFooter(`${client.user.username} message logs`)
          .setColor(`RANDOM`)
          .setTimestamp();
          if (message.image)embed.setImage(message.image);
}
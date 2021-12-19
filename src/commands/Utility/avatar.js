const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    aliases: ['av', 'avi'],
    description: "pulls avatar",
    run: async (client, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

        if (!member.user.avatarURL) return message.channel.send(`That user does not have an avatar`);

        const avatar = new Discord.MessageEmbed()
            .setTitle(`${member.user.username}'s avatar`)
            .setColor("#2f3136")
            .setImage(member.user.avatarURL({size: 1024, format: "png", dynamic: true}))
            .setURL(member.user.avatarURL({size: 1024, format: "png", dynamic: true}))
        message.channel.send({ embeds: [avatar] })
            // If bot doesnt have embed perms 
            .catch(() => message.channel.send('**Error:** Missing permission `Embed link` '));

    }

};
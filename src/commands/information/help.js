const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "help command",

    async run(client, message, args, prefix) {

        let helpArray = message.content.split(" ");
        let helpArgs = helpArray.slice(1);
        
        const help = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`help`)
        .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
        .setDescription("for more support, join the [support server](https://discord.gg/wKR3G6qrw5)")
        .addField(`configuration`, "`;help configuration`")
        .addField(`fun`, "`;help fun`")
        .addField(`information`, "`;help info`")
        .addField(`moderation`,"`;help moderation`")
        .addField(`utility`,"`;help utility`")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        if(!helpArgs[0]) return message.reply({
            embeds: [help]
        })

        const help2 = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`configuration commands`)
        .setDescription("`antinuke`, `prefix`")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        if(helpArgs[0] === 'configuration') return message.reply({
            embeds: [help2]
        })

        const help3 = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`fun commands`)
        .setDescription("test")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        if(helpArgs[0] === 'fun') return message.reply({
            embeds: [help3]
        })

        const help4 = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`information commands`)
        .setDescription("`botinfo`, `help`, `invite`, `ping`, `uptime`")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        if(helpArgs[0] === 'info') return message.reply({
            embeds: [help4]
        })

        const help5 = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`moderation commands`)
        .setDescription("`botinfo`, `help`, `invite`, `ping`, `uptime`")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        if(helpArgs[0] === 'moderation') return message.reply({
            embeds: [help5]
        })

        const help6 = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`utility commands`)
        .setDescription("`avatar`, `banner`, `guildbanner`, `guildicon`, `inrole`, `membercount`, `serverinfo`, `weather`")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        if(helpArgs[0] === 'utility') return message.reply({
            embeds: [help6]
        })
        // message.reply({ embeds: [help] })
        // ${client.user.username} 
            
    }
}
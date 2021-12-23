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
        .addField(`admin`, "`;help admin`")
        .addField(`fun`, "`;help fun`")
        .addField(`info`,"`;help info`")
        .addField(`utility`,"`;help utility`")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        if(!helpArgs[0]) return message.reply({
            embeds: [help]
        })

        const help2 = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`test`)
        .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
        .setDescription("test")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        if(helpArgs[0] === 'admin') return message.reply({
            embeds: [help2]
        })

        const help3 = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`test`)
        .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
        .setDescription("test")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        if(helpArgs[0] === 'fun') return message.reply({
            embeds: [help3]
        })

        const help4 = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`test`)
        .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
        .setDescription("test")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        if(helpArgs[0] === 'info') return message.reply({
            embeds: [help4]
        })

        const help5 = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`utility commands`)
        .setDescription("`avatar`, `guildbanner`, `guildicon`, `inrole`, `membercount`")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        if(helpArgs[0] === 'utility') return message.reply({
            embeds: [help5]
        })
        // message.reply({ embeds: [help] })
        // ${client.user.username} 
            
    }
}
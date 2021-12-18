const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "help command",

    async run(client, message, args, prefix) {

        let helpArray = message.content.split(" ");
        let helpArgs = helpArray.slice(1);
        
        const help = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle(`${client.user.username}`)
        .setThumbnail(`${client.user.avatarURL({ dynamic: true })}`)
        .setDescription(`**updates** \n **11/16** - bot has been revamped. \n \n **[bot invite](https://discord.com/api/oauth2/authorize?client_id=745743723496996864&permissions=8&scope=bot)**\n **[support server](https://discord.gg/wKR3G6qrw5)**`)
        .addField(`config`, "`prefix` `setbanner` `seticon` `setsplash` `setup`")
        .addField(`fun`,"`8ball` `coinflip` `firstmessage` `hack` `hug` `image` `joke` `kiss` `meme` `penis` `poll` `slap` `snipe` `spotify`")
        .addField(`info`,"`botinfo` `donate` `help` `invite` `ping` `uptime`")
        .addField(`moderation`,"`ban` `botclear` `emojiadd` `hackban` `jail` `kick` `lock` `purge` `purgeuser` `rename` `role` `rolecreate` `roleremove` `unban` `unjail` `unlock` `unmute` ")
        .addField(`utility`,"`afk` `anime` `avatar` `banner` `embed` `emojiadd` `enlarge` `guildbanner` `guildicon` `imdb` `membercount` `members` `roleinfo` `serverinfo` `status` `twitter` `urban` `userinfo` `weather` ")
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
        message.channel.send({
            embeds: [help]
        })

        // message.reply({ embeds: [help] })
            
    }
}
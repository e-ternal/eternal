const client = require("../../../index")
const clientSchema = require("../../schemas/client")
const guildSchema = require("../../schemas/guild")
const { MessageEmbed } = require("discord.js")

client.on('guildCreate', async (guild) => {

    let chan = client.channels.cache.get("798610098108760087")
    
    const clientSchem = await clientSchema.findOne({
        clientId: client.id
    })

    if (!clientSchem.whitelistedGuilds.includes(guild.id)) {
        let joinedButNotWhitelistedEmbed = new MessageEmbed()
        .setColor('#2F3136')
        .setTitle(`${guild.name} — **joined server**`)
        .setDescription(`id: \`${guild.id}\`\nmembers: **${guild.memberCount}**\nstatus: \`NOT WHITELISTED\``)
        .setTimestamp()
        .setFooter(`${guild.ownerId}`)
        chan.send({ 
            embeds: [joinedButNotWhitelistedEmbed]
        })
        await guild.leave()
    } else {
        let joinedAndWhitelisted = new MessageEmbed()
        .setColor('#2F3136')
        .setTitle(`${guild.name} — **joined server**`)
        .setDescription(`id: \`${guild.id}\`\nmembers: **${guild.memberCount}**\nstatus: \`WHITELISTED\``)
        .setTimestamp()
        .setFooter(`${guild.ownerId}`)
        chan.send({ 
            embeds: [joinedAndWhitelisted]
        })
    }
})
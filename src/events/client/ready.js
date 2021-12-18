const client = require("../../../index")
const clientSchema = require("../../schemas/client")

const { MessageEmbed } = require("discord.js")
const fs = require("fs")

client.on('ready', async () => {

    const clientSchem = await clientSchema.findOne({
        clientId: client.id
    })
    if (!clientSchem) {
        await clientSchema.create({
            clientId: client.id
        })
    }
    
    console.log(`eternal is online`)

    const activites = [
        {name: `;help | ${client.guilds.cache.size} servers`, type: "WATCHING"},
        {name: `;help | ${client.users.cache.size} users`, type: "LISTENING"},
    ]
    let activity = 0
    client.user.setPresence({status: "dnd", activity: activites[0]})
    setInterval(() => {
        if(activity === activity.length) return activity = 0;
        activity++
        client.user.setActivity(activites[Math.floor(Math.random() * activites.length)])
    }, 1000 * 35);
    
})



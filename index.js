const { Client, Intents, Collection } = require("discord.js")
require("dotenv").config()

const client = new Client({
    intents: Object.keys(Intents.FLAGS).filter(f => f.startsWith("GUILD")),
    partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
    allowedMentions: { repliedUser: false },
    restTimeOffset: 0,
})

module.exports = client
client.commands = new Collection()

client.utils = require("./src/utils/main.js")
require("./src/utils/main.js").loadFeatures(client)

client.login(process.env.token)
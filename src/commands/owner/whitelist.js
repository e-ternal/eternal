const { Client, Message, MessageEmbed } = require("discord.js")
const clientSchema = require("../../schemas/client")

module.exports = {
    name: "whitelist",
    description: "adds a server to the whitelist",
    category: "developer",
    owner: true,
    aliases: ['wl'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        try {
            if (!args[0]) return;
            
            if (args[0] === 'add' || args[0] === "allow") {
                let newGuildId = args[1]
                if (!newGuildId) {
                    let embed1 = new MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`<:eternalError:921857438502756434> ${message.author}: you did not provide an **ID**`)
                    return message.reply({
                        embeds: [embed1] 
                    })
                } else if (newGuildId.length > 18) {
                    let embed2 = new MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`<:eternalError:921857438502756434> ${message.author}: the guild ID cannot exceed **18 characters**`)
                    return message.reply({
                        embeds: [embed2] 
                    })
                } else if (newGuildId.length < 18) {
                    let embed3 = new MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`<:eternalError:921857438502756434> ${message.author}: the guild ID cannot be less than **18 characters**`)
                    return message.reply({
                        embeds: [embed3] 
                    })
                }

                await clientSchema.findOneAndUpdate({
                    clientId: client.id
                }, {
                    $push: {
                        whitelistedGuilds: newGuildId
                    }
                })
                let embed4 = new MessageEmbed()
                .setColor('#2F3136')
                .setDescription(`<:eternalSuccess:921857405447454761> ${message.author}: whitelisted guild: \`${newGuildId}\``)
                return message.reply({
                    embeds: [embed4]
                })
            } else if (args[0] === 'rem' || args[0] === 'remove') {
                let guildId = args[1]
                if (!guildId) {
                    let embed1 = new MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`<:eternalError:921857438502756434> ${message.author}: you did not provide an **ID**`)
                    return message.reply({
                        embeds: [embed1] 
                    })
                } else if (guildId.length > 18) {
                    let embed2 = new MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`<:eternalError:921857438502756434> ${message.author}: the guild ID cannot exceed **18 characters**`)
                    return message.reply({
                        embeds: [embed2] 
                    })
                } else if (guildId.length < 18) {
                    let embed3 = new MessageEmbed()
                    .setColor('#2f3136')
                    .setDescription(`<:eternalError:921857438502756434> ${message.author}: the guild ID cannot be less than **18 characters**`)
                    return message.reply({
                        embeds: [embed3] 
                    })
                }
                await clientSchema.findOneAndUpdate({
                    clientId: client.id
                }, {
                    $pull: {
                        whitelistedGuilds: guildId
                    }
                })
                let embed4 = new MessageEmbed()
                .setColor('#2F3136')
                .setDescription(`<:eternalSuccess:921857405447454761> ${message.author}: removed guild: \`${guildId}\` from the whitelist`)
                return message.reply({
                    embeds: [embed4]
                })
            }
        } catch (e) {
            console.log(e)
            let errorEmbed = new MessageEmbed()
            .setColor('#2f3136')
            .setDescription(`<:eternalError:921857438502756434> ${message.author}: there was an **error** attempting to execute **${module.exports.name}**`)
            return message.reply({
                embeds: [errorEmbed]
            })
        }
    }

}
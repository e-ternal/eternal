const { MessageEmbed } = require("discord.js")
const guilds = require("../../schemas/guild")

module.exports = {
    name: "prefix",
    category: "servers",
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['SEND_MESSAGES, EMBED_LINKS'],

    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        try {
            const guildData = await guilds.findOne({guildId: message.guild.id})
            let prefix = guildData ? guildData.prefix : ";"

            if (!args[0]) {
                let prefixEmbed = new MessageEmbed()
                .setColor('#2F3136')
                .setDescription(`${message.author}: Guild prefix: \`${prefix}\``)
                return message.reply({ embeds: [prefixEmbed] })
            }
            if (args[0] === 'set') {
                const newPrefix = args[1] 
                if (!newPrefix) {
                    let noPrefix = new MessageEmbed()
                    .setColor('#2F3136')
                    .setDescription(`<:eternalWarn:873633376114995280> ${message.author}: provide a **prefix** (no more than **3 characters**)`)
                    return message.reply({ embeds: [noPrefix] })
                } else if (newPrefix.length > 3) {
                    let tooLong = new MessageEmbed()
                    .setColor('#2F3136')
                    .setDescription(`<:eternalError:921857438502756434> ${message.author}: the **prefix** cannot exceed **3 characters**`)
                    return message.reply({ embeds: [tooLong] })
                }

                if (newPrefix) {
                    await guilds.findOneAndUpdate({ guildId: message.guild.id}, {
                        prefix: newPrefix
                    })

                    let changedPrefixEmbed = new MessageEmbed()
                    .setColor('#2F3136')
                    .setDescription(`<:eternalSuccess:921857405447454761> ${message.author}: **updated** the **prefix** to \`${newPrefix}\``)
                    return message.reply({ embeds: [changedPrefixEmbed] })
                }
            } else if (args[0] === 'reset' || args[0] === 'remove' || args[0] === 'clear' || args[0] === 'delete') {
                await guilds.findOneAndUpdate({ guildId: message.guild.id }, {
                    prefix: ";"
                })
                
                let resetPrefix = new MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`<:eternalSuccess:921857405447454761> ${message.author}: **reset** the **prefix** to \`;\``)
                return message.reply({ embeds: [resetPrefix] })
            }
        } catch (e) {
            console.log(e)
            let errorEmbed = new MessageEmbed()
            .setColor('#2F3136')
            .setDescription(`<:eternalError:921857438502756434> ${message.author}: there was an **error** when executing **${module.exports.name}**`)
            return message.reply({ embeds: [errorEmbed] })
        }
    }
}
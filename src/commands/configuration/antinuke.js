const { MessageEmbed } = require("discord.js")
const guildSchema = require("../../schemas/guild")

module.exports = {
    name: "antinuke",
    category: "servers",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        try {

            const guildSchem = await guildSchema.findOne({
                guildId: message.guild.id
            })
            if (!guildSchem) {
                await guildSchema.create({
                    guildId: message.guild.id
                })
            }

            if (args[0] === 'configuration') {
                const isAntinukePermissionsOn = guildSchem.antinuke_permissions 
                if (isAntinukePermissionsOn === true) {
                    a = "<:eternalSuccess:921857405447454761>"
                } else if (!isAntinukePermissionsOn === false) {
                    a = "<:eternalError:921857438502756434>"
                }
                let configEmbed = new MessageEmbed()
                .setTitle(`Configuration`)
                .setDescription(`${a}`)
                return message.reply({
                    embeds: [configEmbed]
                })
            }
        } catch (e) {
            console.log(e)
            const errorEmbed = new MessageEmbed()
            .setColor('#2F3136')
            .setDescription(`<:eternalError:921857438502756434> ${message.author}: there was an **error** when executing **${module.exports.name}**`)
            return message.reply({ embeds: [errorEmbed] })
        }
    }
}
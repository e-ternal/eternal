const { MessageEmbed } = require("discord.js")
const guilds = require("../../schemas/guild")

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

            
        } catch (e) {
            console.log(e)
            .setColor('#2F3136')
            .setDescription(`<:eternalError:921857438502756434> ${message.author}: there was an **error** when executing **${module.exports.name}**`)
            return message.reply({ embeds: [errorEmbed] })
        }
    }
}
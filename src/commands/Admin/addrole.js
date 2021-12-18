const { Client, Message, MessageEmbed } = require("discord.js")
const clientSchema = require("../../schemas/client")

module.exports = {
    name: "addrole",
    description: "adds a role to the member",
    category: "admin",
    botPermissions: ["MANAGE_ROLES"],
    userPermissions: ["MANAGE_ROLES"],
    aliases: ['wl'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        try {
        
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
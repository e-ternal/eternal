const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "snipe",
    description: "Get a snipe of your choice in the channel!",
    usage: "[snipe number]",
    aliases: ['s'],
    category: "info",
    run: async (client, message, args) => {
        const msg = client.snipes.get(message.channel.id)
        if (!msg) {
            let prefixEmbed = new MessageEmbed()
            .setColor('#2F3136')
            .setDescription(`<:eternalWarn:873633376114995280> ${message.author}: there is nothing to snipe`)
            return message.reply({ embeds: [prefixEmbed] })
        } 
        const embed = new MessageEmbed()
        .setAuthor(msg.author)
        .setDescription(msg.content)
        .setTimestamp()
        .setColor('#2F3136')
        if (msg.image) embed
        .setAuthor(msg.author)
        .setImage(msg.image)
        .setColor('#2F3136')
        .setTimestamp()

        message.channel.send({ embeds: [embed] })
    }
}
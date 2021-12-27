const { MessageEmbed } = require("discord.js")
const axios = require("axios")

module.exports = {
    name: "banner",
    description: "Shows the enlarged version of your's or the mentioned user's banner.",
    usage: "<member>",
    run: async(client, message, args) => {
        
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        if(!user) {
            let errorEmbed = new MessageEmbed()
            .setColor('#2F3136')
            .setDescription(`<:eternalWarn:873633376114995280> ${message.author}: unexpected error`)
            return message.reply({ embeds: [errorEmbed] })
        }

        axios.get(`https://discord.com/api/users/${user.id}`, {
            
            headers: {
                Authorization: `Bot ${client.token}`
            },
        })

        .then((res) => {
            const { banner, accent_color } = res.data

            if(banner)  {

                
                const extension = banner.startsWith("a_") ? '.gif' : '.png'

                
                const image = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;
               
                

                const embed = new MessageEmbed()
                .setTitle(`${user.user.tag}'s banner`)
                .setImage(image)
                .setColor("#2f3136")
                message.reply({embeds: [embed]})
            } else {
                if(accent_color) {
                const embed = new MessageEmbed()
                .setDescription(`${user.user.tag} does not have a banner, but they do have an accent color.`)
                .setColor(accent_color)

                message.reply({embeds: [embed]})
                } else {
                    message.reply(`${user.user.tag} does not have a banner nor an accent color.`)
                }
            }
        })
    }
}
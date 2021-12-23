const Discord = require('discord.js');
module.exports = {
    name: "portal",
    folder: "owner",
    owner: true,
    props: {
        aliases: [
            "createportal",
            "transport",
            "portalcreate",
        ],
        args: {
            need: 1,
            prompt: "which guild should I create a portal to?",
            usage: {
                format: "{id}",
                examples: ["778883981982"]
            }
        }
    },
    about: "Creates a server portal.",

    async run(client, message, args) {

        const guild = client.guilds.cache
            .get(args[0]);

        if (guild) {
            guild.channels.cache
                .filter(channel => channel.type !== "category").first()
                .createInvite(
                    false,
                    84600,
                    0,
                    false
                ).then(invite => message.channel.send(`discord.gg/${invite.code}`));
        } else {
            const portalembed = new Discord.MessageEmbed()
      .setDescription('guild was not found')
      .setColor(`#2f3136`)
            return message.channel.send({ embeds: [portalembed] })
        };
    }
};
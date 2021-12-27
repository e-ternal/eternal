const { MessageEmbed } = require("discord.js")
const { Collection } = require("mongoose")
const client = require("../../../index")
const guildSchema = require("../../schemas/guild")
const userSchema = require("../../schemas/user")
const owners = ["852603783455309918", "188726511644180481"]

client.on('messageCreate', async (message) => {
    
    const guildSchem = await guildSchema.findOne({
        guildId: message.guild.id
    })
    if (!guildSchem) {
        await guildSchema.create({
            guildId: message.guild.id
        })
    }

    let prefix = guildSchem ? guildSchem.prefix : ";" 

    if (message.author.bot || !message.guild) return;

    const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
    const myprefix = new MessageEmbed()
      .setDescription(`**My prefix in this guild is** \`${prefix}\`.`)
      .setColor(`#2f3136`)
    if (message.content.match(mentionRegex)) {
        message.reply({
            embeds: [myprefix]
        })
        // const embed1 = new MessageEmbed()
        // message.reply({ embeds: [embed] })
    }

    if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
    
    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/);
    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (command) {
        const userSchem = await userSchema.findOne({
            userId: message.author.id,
            guildId: message.guild.id
        })
        if (!userSchem) {
            await userSchema.create({
                userId: message.author.id,
                guildId: message.guild.id
            })
        }

        if (command.owner) {
            if (!owners.includes(message.author.id)) {
                return;
            }
        }

        if (command.userPermissions) {
            let reqPerms = []
            command.userPermissions.forEach((p) => {
                reqPerms.push(client.utils.formatUnderlines(p))
            })
            if (!message.member.permissions.has(command.userPermissions || [] )) {
                return message.reply({
                    content: `this command requires \`${reqPerms.join(", ")}\` permissions`
                })
            }
        }

        if (command.botPermissions) {
            let reqPerms = []
            command.botPermissions.forEach((p) => {
                reqPerms.push(client.utils.formatUnderlines(p))
            })
            if(!message.guild.me.permissions.has(command.botPermissions || [])) {
                return message.reply({
                    content: `this command requires me to have ${reqPerms.join("\n")} permissions`
                })
            }
        }

        const props = {
            prefix: guildSchem.prefix,
            guild: guildSchem
        }

        await command.run(client, message, args, props)
    }
})
client.snipes = new Map();
client.on('messageDelete', async function (message, channel) {
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        image: message.attachments.first() ?
        message.attachments.first.proxyURL : null
    })
})
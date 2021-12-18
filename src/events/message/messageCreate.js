const { MessageEmbed } = require("discord.js")
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
    if (message.content.match(mentionRegex)) {
        message.reply({
            content: `My prefix in this guild is \`${prefix}\`.`
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
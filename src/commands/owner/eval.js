const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "eval",
    aliases: ["pyk"],
    // cooldown:  ,

    /** *
    * @param { Client } client
    * @param { Message }message
    * @param { String[] } args
    */

    run: async (client, message, args) => {
        const noperms = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL({
        dynamic: true
      }))
      .setDescription('you dont have permission to execute this command')
      .setColor(`#2f3136`)
        if (message.author.id != "188726511644180481") return message.channel.send({ embeds: [noperms] })

        const clean = text => {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }

}
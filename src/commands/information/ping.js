const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",
  cooldown: 0,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const msg = await message.channel.send(`Pinging...`);
    const embed = new MessageEmbed()
      .setDescription(
        `**websocket** ping is \`${client.ws.ping}ms\`\n**edit** ping is \`${Math.floor(msg.createdAt - message.createdAt)}ms\``)
      .setColor("#2f3136")
    await message.reply({embeds: [embed]});
    msg.delete();
  },
};
const Discord = require('discord.js');

module.exports = {
  name: "uptime",

  run: async (client, message, args) => {

    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    let UptimeDays = days
    if (UptimeDays) {
      UptimeDays = `${days} days, `;
    } else {
      UptimeDays = ''
    }

    let UptimeHours = hours
    if (UptimeHours) {
      UptimeHours = `${hours} hours, `;
    } else {
      UptimeHours = ''
    }

    let UptimeMinutes = minutes
    if (UptimeMinutes) {
      UptimeMinutes = `${minutes} minutes, `;
    } else {
      UptimeMinutes = ''
    }

    let UptimeSeconds = seconds
    if (UptimeSeconds) {
      UptimeSeconds = `${seconds} seconds`;
    } else {
      UptimeSeconds = ''
    }

    const embed = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setDescription(`🕰️ **eternal** has been up for: ${UptimeDays}${UptimeHours}${UptimeMinutes}${UptimeSeconds}`)

    message.reply({
        embeds: [embed]
    })
  }
}
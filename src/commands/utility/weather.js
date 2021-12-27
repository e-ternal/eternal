const weather = require('weather-js');
const Discord = require('discord.js')

module.exports = {
  name: "weather",
  description: "Get the weather of anywhere",
  usage: "weather <>",
  run: (client, message, args) => {
    
    
    const embed = new Discord.MessageEmbed()
    .setTitle('weather')
    .setDescription('gets simple weather information')
    .addField('**usage**', '\`\`\`Syntax: weather <location>\nExample: weather Washington D.C\`\`\`')
    .setTimestamp()
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL())
    .setColor(`#2f3136`)
  if (!args[0]) return message.channel.send({ embeds: [embed] })
    
 weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
try {
 
let weather = new Discord.MessageEmbed()
.setTitle(`Weather - ${result[0].location.name}`)
.setColor("#2f3136")
.setDescription("Temperature units can may be differ some time")
.addField("Temperature", `${result[0].current.temperature} Fahrenheit`, true)
.addField("Sky Text", result[0].current.skytext, true)
.addField("Humidity", result[0].current.humidity, true)
.addField("Wind Speed", result[0].current.windspeed, true)//What about image
.addField("Observation Time", result[0].current.observationtime, true)
.addField("Wind Display", result[0].current.winddisplay, true)
.setThumbnail(result[0].current.imageUrl);
message.channel.send({ embeds: [weather] })

} catch(err) {
    const errorembed = new Discord.MessageEmbed()
      .setDescription('<:eternalWarn:873633376114995280> unable to get the data of given location')
      .setColor(`#2f3136`)
  return message.channel.send({ embeds: [errorembed] })
}
});   
    
  }
}
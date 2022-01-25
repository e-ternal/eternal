const Discord = require("discord.js")
module.exports = {
  name: "8ball",
  category: "fun",
  run: async (client, message, args,) => {
    if (!args[0]) {
        let error1 = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setDescription(`<:eternalWarn:873633376114995280> ${message.author}:  please provide a full question`)
        return message.reply({ embeds: [error1] })
    }
    let replies = [
      `yes`,
      `just go home loser`,
      `without a doubt`,
      "it is certain",
      "you may rely on it",
      "as I see it, yes",
      "sost likely",
      "hell nah",
      "hell yea",
      "signs point to yes.",
      "i didnt hear yo dumb ass, please try again.",
      "ask again later",
      "better not tell you now",
      "cannot predict now.",
      "why would you ask that dumbass question my boy?",
      "don't count on it",
      "my reply is no",
      "my sources say no",
      "outlook not so good",
      "very doubtful",
      "maybe idk",
      "indeed",
      "idk",
      "maybe no.",
      "we can not be never sure",
      "what ever floats your boat",
      "just do it",
      "sorry, but this is really stupid question",
      "we can not be never sure",
      "you already know the answer",
      "very bad idea",
      "never",
      "maybe yes",
      "maybe no"
    ];
    
    let result = Math.floor(Math.random() * replies.length);
    let question = args.slice(0).join(" ");
    
    let ballembed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({
        dynamic: true
      }))
      .setColor("#2f3136")
      .addField("question", question)
      .addField("answer", replies[result]);
    
    message.channel.send({ embeds: [ballembed] });
         }
        }
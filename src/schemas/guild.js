const { model, Schema } = require("mongoose")

const schema = new Schema({

    // general

    guildId: String,
    prefix: {
        type: String,
        default: ";"
    }


})

module.exports = model("guilds", schema)
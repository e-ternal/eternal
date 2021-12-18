const { model, Schema } = require("mongoose")

const schema = new Schema({

    // general

    userId: String,
    guildId: String,


})

module.exports = model("users", schema)
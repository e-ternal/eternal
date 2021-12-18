const { model, Schema } = require("mongoose")

const schema = new Schema({

    // general

    clientId: String,

    // owner stuff

    minimumMembers: {
        type: String,
        default: "5"
    },

    whitelistedGuilds: {
        type: Array,
        default: []
    }

})

module.exports = model("client", schema)
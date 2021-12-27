const { model, Schema } = require("mongoose")

const schema = new Schema({

    // general

    guildId: String,
    prefix: {
        type: String,
        default: ";"
    },

    // antinuke

    antinuke_permissions: { 
        type: Boolean,
        default: false 
    },
    antinuke_channel: { 
        type: Boolean, 
        default: false
    },
    antinuke_role: { 
        type: Boolean, 
        default: false 
    },
    antinuke_ban: { 
        type: Boolean, 
        default: false 
    },
    antinuke_kick: {
        type: Boolean, 
        default: false 
    },
    antinuke_webhook: { 
        type: Boolean, 
        default: false 
    },
    antinuke_botadd: { 
        type: Boolean, 
        default: false 
    },
    antinuke_vanity: { 
        type: Boolean, 
        default: false 
    },  
    antinuke_logging_channel: { 
        type: String, 
        default: "NONE" 
    },
    antinuke_whitelist: { 
        type: Array, 
        default: [] 
    },
    antinuke_admins: { 
        type: Array, 
        default: [] 
    },
    antinuke_punishment: { 
        type: String, 
        default: "ban" 
    },


})

module.exports = model("guilds", schema)
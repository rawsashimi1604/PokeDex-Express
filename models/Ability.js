const mongoose = require("mongoose");

const AbilitySchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    effect: {
        type: String
    },
    is_hidden: {
        type: Boolean
    }
})

module.exports = mongoose.model("Ability", AbilitySchema);
const mongoose = require("mongoose");

const MovesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    method: {
        type: String
    },
    level: {
        type: Number
    },
    machine: {
        type: [{
            machine_type: {
                type: String
            },
            machine_number: {
                type: Number
            },
        }]
    },
    type: {
        type: String
    },
    category: {
        type: String
    },
    power: {
        type: Number
    },
    pp: {
        type: Number
    },
    accuracy: {
        type: Number
    },
    priority: {
        type: Number
    },
})

module.exports = mongoose.model("Move", MovesSchema);
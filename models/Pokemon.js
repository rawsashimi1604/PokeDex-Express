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

const StatsSchema = new mongoose.Schema({
    hp: {
        type: Number
    },
    attack: {
        type: Number
    },
    defense: {
        type: Number
    },
    special_attack: {
        type: Number
    },
    special_defense: {
        type: Number
    },
    speed: {
        type: Number
    },
})

// const MovesSchema = new mongoose.Schema({
//     name: {
//         type: String
//     },
//     method: {
//         type: String
//     },
//     level: {
//         type: Number
//     },
//     machine: {
//         type: [{
//             machine_type: {
//                 type: String
//             },
//             machine_number: {
//                 type: Number
//             },
//         }]
//     },
//     type: {
//         type: String
//     },
//     category: {
//         type: String
//     },
//     power: {
//         type: Number
//     },
//     pp: {
//         type: Number
//     },
//     accuracy: {
//         type: Number
//     },
//     priority: {
//         type: Number
//     },
// })

// defines document type
const PokemonSchema = new mongoose.Schema({
    name: {
        type: String
    },
    pokeID: {
        type: Number
    },
    gene: {
        type: String
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number
    },
    types: {
        type: [{
            type1: {
                type: String
            },
            type2: {
                type: String
            }
        }]
    },
    images: {
        type: [{
            sprite: {
                type: String
            },
            partySprite: {
                type: String
            }
        }]
    },
    description: {
        type: String
    },
    abilities: [AbilitySchema],
    stats: StatsSchema,
    // moves: [MovesSchema],
})

module.exports = mongoose.model("Pokemon", PokemonSchema);
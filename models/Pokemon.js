const mongoose = require("mongoose");

// defines document type
const PokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must provide Pokemon name"],
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"],
    },
    pokeID: {
        type: Number,
        unique: true,
        required: [true, "Must provide Pokedex ID"],
    },
    type1: {
        type: String,
        required: [true, "Must provide Pokemon type 1"],
        trim: true,
        maxlength: [12, "Type1 can not be more than 12 characters"],
    },
    type2: {
        type: String,
        trim: true,
        maxlength: [12, "Type2 can not be more than 12 characters"],
    },
    sprite: {
        type: String,
        required: [true, "Must provide Pokemon Sprite img src link"],
    },
    flavorText: {
        type: String,
        required: [true, "Must provide Pokemon flavor text"],
    }
})

module.exports = mongoose.model("Pokemon", PokemonSchema);
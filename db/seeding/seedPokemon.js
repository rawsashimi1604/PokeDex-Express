// Seed database
const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('../connect');
const Pokemon = require("../../models/Pokemon");
require("dotenv").config();


const connect = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
    } catch (e) {
        console.log(e);
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

connect(process.env.MONGO_URI);

async function seedDBNew(sleepTime) {

    // Remove collection in MongoDB.
    Pokemon.collection.drop();

    // Add new documents.
    for (let i = 1; i <= 151; i++) {

        // Data Fields
        let imgSrc;
        let name;
        let pokeID;
        let type1;
        let type2;
        let flavorText;

        await sleep(sleepTime); // buffer to reduce API server load

        // Get Data from PokeAPI
        axios.all([
            axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`),
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}/`)
        ]).then(responseArr => {

            // Get Main Data
            imgSrc = responseArr[0].data.sprites.front_default;
            name = responseArr[0].data.name;
            pokeID = responseArr[0].data.id;
            type1 = responseArr[0].data.types[0].type.name;
            type2 = responseArr[0].data.types[1];
            if (typeof type2 !== 'undefined') {
                type2 = type2.type.name;
            }

            // Get Description
            const flavorTextArr = responseArr[1].data.flavor_text_entries
            for (let j = 0; j < flavorTextArr.length; j++) {
                if (flavorTextArr[j].language.name === "en") {
                    flavorText = flavorTextArr[j].flavor_text;
                }
            }

            // Get Party Sprite src link
            const partySpriteLink = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${name}.png`;

            // Add to DB
            const pokeObject = {
                name: name,
                pokeID: pokeID,
                types: [{
                    type1: type1,
                    type2: type2,
                }],
                images: [{
                    sprite: imgSrc,
                    partySprite: partySpriteLink,
                }],
                flavorText: flavorText
            }
            console.log(pokeObject);

            // Create document in MongoDB
            Pokemon.create(pokeObject);
        })
    }

    return;
}

seedDBNew(200);
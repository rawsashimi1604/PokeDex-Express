// Seed database
const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('../connect');
const Pokemon = require("../../models/Pokemon");
const Ability = require("../../models/Ability");
const {
    response
} = require('express');
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
        let sprite;
        let name;
        let pokeID;
        let gene;
        let height;
        let weight;
        let type1;
        let type2;
        let description;

        await sleep(sleepTime); // buffer to reduce API server load

        // Get Data from PokeAPI
        axios.all([
            axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`),
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}/`),
        ]).then(responseArr => {

            // Get Main Data
            sprite = responseArr[0].data.sprites.front_default;
            name = responseArr[0].data.name;
            pokeID = responseArr[0].data.id;
            height = responseArr[0].data.height;
            weight = responseArr[0].data.weight;
            type1 = responseArr[0].data.types[0].type.name;
            type2 = responseArr[0].data.types[1];
            if (typeof type2 !== 'undefined') {
                type2 = type2.type.name;
            }

            // Get Party Sprite src link
            const partySprite = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${name}.png`;

            // Get Description
            const flavorTextArr = responseArr[1].data.flavor_text_entries
            for (let j = 0; j < flavorTextArr.length; j++) {
                if (flavorTextArr[j].language.name === "en") {
                    description = flavorTextArr[j].flavor_text;
                }
            }

            // Get Genus
            const genusArr = responseArr[1].data.genera;
            for (let j = 0; j < genusArr.length; j++) {
                if (genusArr[j].language.name === "en") {
                    gene = genusArr[j].genus;
                }
            }

            // Get Stats
            const stats = responseArr[0].data.stats;

            let statsHp;
            let statsAtt;
            let statsDef;
            let statsSpAtt;
            let statsSpDef;
            let statsSpeed;

            for (let j = 0; j < stats.length; j++) {
                if (stats[j].stat.name === "hp") {
                    statsHp = stats[j].base_stat
                } else if (stats[j].stat.name === "attack") {
                    statsAtt = stats[j].base_stat
                } else if (stats[j].stat.name === "defense") {
                    statsDef = stats[j].base_stat
                } else if (stats[j].stat.name === "special-attack") {
                    statsSpAtt = stats[j].base_stat
                } else if (stats[j].stat.name === "special-defense") {
                    statsSpDef = stats[j].base_stat
                } else if (stats[j].stat.name === "speed") {
                    statsSpeed = stats[j].base_stat
                }
            }

            const statsObj = {
                hp: statsHp,
                attack: statsAtt,
                defense: statsDef,
                special_attack: statsSpAtt,
                speical_defense: statsSpDef,
                speed: statsSpeed
            }

            // Get Abilities
            const abilities = responseArr[0].data.abilities;
            const abilityPromises = [];
            for (let j = 0; j < abilities.length; j++) {
                let abilityName = abilities[j].ability.name;
                abilityPromises.push(Ability.findOne({
                    name: abilityName
                }));
            }

            Promise.all(abilityPromises).then(responseArray => {
                abilityObject = responseArray;
                let pokeObj = {
                    name: name,
                    pokeID: pokeID,
                    gene: gene,
                    height: height,
                    weight: weight,
                    types: [{
                        type1: type1,
                        type2: type2
                    }],
                    images: [{
                        sprite: sprite,
                        partySprite: partySprite
                    }],
                    description: description,
                    abilities: abilityObject,
                    stats: statsObj
                }
                console.log(pokeObj)
                Pokemon.create(pokeObj);
            })
        })
    }

    return;
}

seedDBNew(200);
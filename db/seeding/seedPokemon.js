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
    for (let i = 1; i <= 1; i++) {

        // Data Fields
        let imgSrc;
        let name;
        let pokeID;
        let type1;
        let type2;
        let flavorText;
        let ability;

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

            // Get Party Sprite src link
            const partySpriteLink = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${name}.png`;

            // Get Description
            const flavorTextArr = responseArr[1].data.flavor_text_entries
            for (let j = 0; j < flavorTextArr.length; j++) {
                if (flavorTextArr[j].language.name === "en") {
                    flavorText = flavorTextArr[j].flavor_text;
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

            console.log(statsObj)

            // Get Moves
            const moves = responseArr[0].data.moves



            // Get Abilities
            const abilityArray = [];
            let abilityInfoArray = responseArr[0].data.abilities;

            async function getAllAbilities(abilityArray, abilityInfoArray) {
                const abilityObjArray = [];

                for (let j = 0; j < abilityInfoArray.length; j++) {
                    async function getAbilityData(abilityCurrSelectedObj, abilityObjArray) {
                        let abilitySrc = abilityCurrSelectedObj.ability.url;
                        let abilityEffect;
                        let abilityDescription;

                        return axios.get(abilitySrc).then(resp => {
                            // Get the ability effect data
                            let abilityEffects = resp.data.effect_entries;
                            for (k = 0; k < abilityEffects.length; k++) {
                                if (abilityEffects[k].language.name === "en") {
                                    abilityEffect = abilityEffects[k].effect;
                                    break;
                                }
                            }
                            let abilityDescriptions = resp.data.flavor_text_entries;
                            for (k = 0; k < abilityDescriptions.length; k++) {
                                if (abilityDescriptions[k].language.name === "en" && abilityDescriptions[k].version_group.name == "firered-leafgreen") {
                                    abilityDescription = abilityDescriptions[k].flavor_text;
                                }
                            }
                        }).then(() => {
                            let abilityName = abilityCurrSelectedObj.ability.name;
                            let abilityIsHidden = abilityCurrSelectedObj.is_hidden;
                            const abilityObj = {
                                name: abilityName,
                                description: abilityDescription,
                                effect: abilityEffect,
                                is_hidden: abilityIsHidden
                            }
                            // abilityObjArray.push(abilityObj);
                            return abilityObj;
                        })
                    }

                    let abilityObj = await getAbilityData(abilityInfoArray[j], abilityObjArray);
                    abilityObjArray.push(abilityObj);
                }
                return abilityObjArray
            }

            // getAllAbilities(abilityArray, abilityInfoArray).then(resp => {
            //     console.log(resp);
            // })


        })
    }

    return;
}

seedDBNew(200);
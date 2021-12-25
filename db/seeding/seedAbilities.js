// Seed database
const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('../connect');
const Ability = require("../../models/Ability");
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


async function seedDBAbilities(sleepTime) {

    Ability.collection.drop();

    for (let i = 1; i <= 151; i++) {
        // Get Ability from each pokemon
        axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then(resp => {
            let abilityInfoArray = resp.data.abilities;


            async function getAllAbilities(abilityInfoArray) {
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
                            return abilityObj;
                        })
                    }

                    let abilityObj = await getAbilityData(abilityInfoArray[j], abilityObjArray);
                    abilityObjArray.push(abilityObj);
                }
                return abilityObjArray
            }

            getAllAbilities(abilityInfoArray).then(resp => {
                for (let i = 0; i < resp.length; i++) {
                    let addAbility = async () => {
                        let documentExists = await Ability.exists({
                            name: resp[i].name
                        });
                        if (documentExists) {
                            console.log(`${resp[i].name} already exists.`);
                        } else {
                            console.log(`Added ${resp[i].name} into database.`);
                            Ability.create(resp[i]);
                        }
                        return documentExists;
                    }
                    addAbility();
                }
            })
        })

        await sleep(sleepTime);
    }
}

seedDBAbilities(200);
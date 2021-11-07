// Seed database
const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('../db/connect');
const Pokemon = require("../models/Pokemon");
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
    for (let i = 1; i <= 151; i++) {
        await sleep(sleepTime);
        axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then(resp => {
            let imgSrc = resp.data.sprites.front_default;
            let name = resp.data.name;
            let pokeID = resp.data.id;
            let type1 = resp.data.types[0].type.name;
            let type2 = resp.data.types[1];
            if (typeof type2 !== 'undefined') {
                type2 = type2.type.name;
            }

            const pokeObject = {
                name: name,
                pokeID: pokeID,
                type1: type1,
                type2: type2,
                sprite: imgSrc
            }
            console.log(pokeObject);
            Pokemon.create(pokeObject);
        });
    }
}

seedDBNew(500);
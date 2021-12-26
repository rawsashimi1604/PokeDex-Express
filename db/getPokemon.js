const Pokemon = require('../models/Pokemon');

async function retrieveAllPokemonFromDB() {
    const data = [];
    for (let i = 1; i <= 151; i++) {
        const myPokeObj = await Pokemon.findOne({
            pokeID: i
        });
        data.push(myPokeObj);
    }
    return data;
}

async function retrievePokemonFromDB(pokeID) {
    const myPokeObj = await Pokemon.findOne({
        pokeID: pokeID
    });
    console.log(myPokeObj);
    return myPokeObj;
}

exports.retrieveAllPokemonFromDB = retrieveAllPokemonFromDB;
exports.retrievePokemonFromDB = retrievePokemonFromDB;
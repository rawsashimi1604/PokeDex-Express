const Pokemon = require('../models/Pokemon');

async function retrieveAllPokemonFromDB() {
    try {
        const data = [];
        for (let i = 1; i <= 151; i++) {
            const myPokeObj = await Pokemon.findOne({
                pokeID: i
            });
            data.push(myPokeObj);
            
        }
        console.log("Got pokemon from DB!")
        return data;
    } catch (error) {
        console.log(error)
    }
    
}

async function retrievePokemonFromDB(pokeID) {
    try {
        const myPokeObj = await Pokemon.findOne({
            pokeID: pokeID
        });
        console.log(myPokeObj);
        return myPokeObj;
    } catch (error) {
        console.log(error)
    }
    
}

exports.retrieveAllPokemonFromDB = retrieveAllPokemonFromDB;
exports.retrievePokemonFromDB = retrievePokemonFromDB;
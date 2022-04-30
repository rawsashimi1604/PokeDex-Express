const Pokemon = require('../models/Pokemon');

async function retrieveAllPokemonFromDB() {
    const allPokemon = await Pokemon.find({});
    return allPokemon;
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
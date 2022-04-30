const Pokemon = require('../models/Pokemon');

async function retrieveAllPokemonFromDB() {
    return new Promise(async (res, rej) => {
        try {
            const data = [];
            for (let i = 1; i <= 151; i++) {
                const myPokeObj = await Pokemon.findOne({
                    pokeID: i
                });
                data.push(myPokeObj)            
            }
            res(data)
        } catch (error) {
            rej(error)
        }
    })
    
    console.log("Got pokemon from DB!");
    console.log(data);
    return data;
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
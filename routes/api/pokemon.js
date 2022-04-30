const express = require('express');
const router = new express.Router();

const getPokemon = require('../../db/getPokemon');

// GET All Pokemon
router.get('/pokemon', async function (req, res) {
    try {
        const data = await getPokemon.retrieveAllPokemonFromDB();

        data.sort((a, b) => {               // Sort all pokemon by PokeDex ID
            return a.pokeID - b.pokeID;
        })
        
        console.log(data);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.send("Failed to get Data!")
    }
    
})

// GET Specfic Pokemon
router.get('/pokemon/:id', async function (req, res) {
    const data = await getPokemon.retrievePokemonFromDB(req.params.id);
    res.json(data);
})

module.exports = router;
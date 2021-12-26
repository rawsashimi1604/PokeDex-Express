const express = require('express');
const router = new express.Router();

const getPokemon = require('../../db/getPokemon');

// GET All Pokemon
router.get('/pokemon', async function (req, res) {
    const data = await getPokemon.retrieveAllPokemonFromDB();
    res.json(data);
})

// GET Specfic Pokemon
router.get('/pokemon/:id', async function (req, res) {
    const data = await getPokemon.retrievePokemonFromDB(req.params.id);
    res.json(data);
})

module.exports = router;
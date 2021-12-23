const express = require('express');
const router = new express.Router();
const Pokemon = require('../models/Pokemon');
const getPokemon = require('../db/getPokemon');

router.get('/', async function (req, res) {
    const data = await getPokemon.retrieveDataFromDB();
    res.render("../views/home.ejs", {
        data: data
    });
})

router.get('/pokemon', async function (req, res) {
    const data = await getPokemon.retrieveDataFromDB();
    res.render("../views/pokedex.ejs", {
        data: data
    });
})

router.get('/pokemon/:id', async function (req, res) {
    const data = await getPokemon.retrievePokemonFromDB(req.params.id);
    res.render("../views/pokemonPage.ejs", {
        data: data
    });
})

module.exports = router;
const express = require('express');
const router = new express.Router();
const axios = require('axios');
const Pokemon = require('../models/Pokemon');


async function retrieveDataFromDB() {
    const data = [];
    for (let i = 1; i <= 151; i++) {
        const myPokeObj = await Pokemon.findOne({
            pokeID: i
        });
        data.push(myPokeObj);
    }
    return data;
}

router.get('/', async function (req, res) {
    const data = await retrieveDataFromDB();
    res.render("../views/home.ejs", {
        data: data
    });
    // res.json(data);
})

router.get('/pokemon', function (req, res) {
    dbConnect()
    res.send("I love pokemon!");
})

module.exports = router;
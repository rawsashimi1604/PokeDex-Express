const express = require('express');
const router = new express.Router();
const axios = require('axios');

router.get('/', function (req, res) {
    let imgSrc = "";
    let name = "";
    // Get charmander image
    axios.get("https://pokeapi.co/api/v2/pokemon/1").then(resp => {
        imgSrc = resp.data.sprites.front_default;
        name = resp.data.name;
        res.render('home.ejs', {
            imgSrc: imgSrc,
            name: name
        });
    })
})

module.exports = router;
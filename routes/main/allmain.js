const express = require('express');
const axios = require('axios');
const router = new express.Router();
const getPokemon = require('../../db/getPokemon');

const host = process.env.HOST                    // Current URL

router.get('/', async function (req, res) {
    axios.get(host + '/api/pokemon').then(resp => {
        res.render("../views/home.ejs", {
            data: resp.data
        })
    }).catch(err => console.log(err));
})

router.get('/api', function (req, res) {
    res.send("You have reached the API Page, host is ");
})

router.get('/pokemon', async function (req, res) {
    axios.get(host + '/api/pokemon').then(resp => {
        res.render("../views/pokedex.ejs", {
            data: resp.data
        });
    }).catch(err => console.log(err));
})

router.get('/pokemon/:id', async function (req, res) {
    axios.get(host + `/api/pokemon/${req.params.id}`).then(resp => {
        res.render("../views/pokemonPage.ejs", {
            data: resp.data
        });
    })
})

router.get('/search', async function (req, res) {
    console.log(req.query)
    axios.get(host + `/api/pokemon/${req.query.q}`).then(resp => {
        const data = {}
        if (resp.data === null) {
            res.render("../views/404.ejs")
        } else {
            res.render("../views/pokemonPage.ejs", {
                data: resp.data
            })
        }
    })

   
})

module.exports = router;
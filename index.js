const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const PORT = 3000;

// Set html templating engine to EJS
app.set('view engine', 'ejs');
// Set views directory to get html templating
app.set('views', path.join(__dirname, "views"));

// Directory to serve all files
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
    let imgSrc = "";
    // Get charmander image
    axios.get("https://pokeapi.co/api/v2/pokemon/1").then(resp => {
        // console.log(`Sprite links: ${util.inspect(resp.data.sprites, {depth: null})}`);
        imgSrc = resp.data.sprites.front_default;
        res.render('home.ejs', {
            imgSrc: imgSrc
        });
    })
})

app.get('/pokemon', function (req, res) {
    res.send("I love pokemon!");
})

app.listen(PORT, function () {
    console.log(`example app listening at http://localhost:${PORT}`);
})
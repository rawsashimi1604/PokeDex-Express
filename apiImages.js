const axios = require('axios');
const util = require('util');

axios.get("https://pokeapi.co/api/v2/pokemon/1").then(resp => {
    // console.log(`Sprite links: ${util.inspect(resp.data.sprites, {depth: null})}`);
    const img = resp.data.sprites.front_default
    console.log(img);
})
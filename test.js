const axios = require('axios');

axios.get('http://localhost:3000/api/pokemon/1').then(resp => {
    console.log(resp.data);
})
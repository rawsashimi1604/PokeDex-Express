const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function (req, res) {
    res.send("hello world");
})

app.get('/pokemon', function (req, res) {
    res.send("I love pokemon!");
})

app.listen(PORT, function () {
    console.log(`example app listening at http://localhost:${PORT}`);
})
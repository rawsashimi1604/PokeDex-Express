const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Set html templating engine to EJS
app.set('view engine', 'ejs');
// Set views directory to get html templating
app.set('views', path.join(__dirname, "views"));

// Directory to serve all files
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
    res.render('home.ejs');
})

app.get('/pokemon', function (req, res) {
    res.send("I love pokemon!");
})

app.listen(PORT, function () {
    console.log(`example app listening at http://localhost:${PORT}`);
})
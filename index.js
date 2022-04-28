const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./db/connect.js');
const PORT = process.env.PORT || 3000;
require("dotenv").config();

// Live Reload
var livereload = require("livereload");
var connectLivereload = require('connect-livereload');

var liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname);
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.use(connectLivereload());

// Set html templating engine to EJS
app.set('view engine', 'ejs');
// Set views directory to get html templating
app.set('views', path.join(__dirname, "views"));

// Directory to serve all files
app.use(express.static(path.join(__dirname, "/public")));

// Use main routes & API routes
app.use('/', require("./routes/main/allmain"));
app.use('/api', require("./routes/api/pokemon"));
app.use('/api', require("./routes/api/abilities"));

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
    } catch (e) {
        console.log(e);
    }
};

start();
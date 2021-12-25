// Seed database
const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('../connect');
const Pokemon = require("../../models/Pokemon");
require("dotenv").config();
const express = require('express');
const router = new express.Router();

const getAbility = require('../../db/getAbility');

// GET All Pokemon
router.get('/abilities', async function (req, res) {
    const data = await getAbility.retrieveAbilitiesFromDB();
    res.json(data);
})

// GET Specfic Pokemon
router.get('/abilities/:id', async function (req, res) {
    const data = await getAbility.retrieveAbilityFromDB(req.params.id);
    res.json(data);
})

module.exports = router;
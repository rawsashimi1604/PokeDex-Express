const Ability = require('../models/Ability');

async function retrieveAbilitiesFromDB() {
    const myAbilityObj = await Ability.find({});
    return myAbilityObj;
}

async function retrieveAbilityFromDB(abilityID) {
    const myAbilityObj = await Ability.findOne({
        _id: abilityID
    });
    return myAbilityObj;
}

exports.retrieveAbilitiesFromDB = retrieveAbilitiesFromDB;
exports.retrieveAbilityFromDB = retrieveAbilityFromDB;
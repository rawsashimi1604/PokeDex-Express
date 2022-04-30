const Ability = require('../models/Ability');

async function retrieveAbilitiesFromDB() {
    try {
        const myAbilityObj = await Ability.find({});
        return myAbilityObj;
    } catch(error) {
        console.log(error)
    }
    
}

async function retrieveAbilityFromDB(abilityID) {

    try {
        const myAbilityObj = await Ability.findOne({
            _id: abilityID
        });
        return myAbilityObj;
    } catch (error) {
        console.log(error)
    }
    
    
}

exports.retrieveAbilitiesFromDB = retrieveAbilitiesFromDB;
exports.retrieveAbilityFromDB = retrieveAbilityFromDB;
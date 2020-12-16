const Parcours = require("../utile/Parcours");

var Compte = function () {
    var testCompteRules = function (categorie, rules, controlfields, datafields, resultJson) {
        rules[categorie].ordonnancement.forEach(function (regle) {
            const fields = Parcours.findDataFields(datafields, regle.number);
            const subfields = Parcours.getListSubfieldValue(fields,regle.code);
            if(subfields.length < 2) {
                return;
            }
            const fieldsContrainte = Parcours.findDataFields(datafields, regle.contrainte);
            if(fieldsContrainte.length != subfields.length) {
                addError(regle, resultJson);
            }
           
        });
    }

    function addError(regle, resultJson) {
        resultJson.errors.push({
            message: regle.message,
            number: regle.number
        });
    }


    return {
        testCompteRules: testCompteRules

    }
}();

module.exports = Compte;
const Parcours = require("../utile/Parcours");

var Ordonnancement = function () {
    var testOrdonnancementRules = function (categorie, rules, controlfields, datafields, resultJson) {
        rules[categorie].ordonnancement.forEach(function (regle) {
            const fields = Parcours.findDataFields(datafields, regle.number);
            if (fields.length < 2) {
                return;
            }
            let currentOrderBy = fields[0]._attributes[regle.orderBy];
            for (let i in fields) {
                if(fields[i]._attributes[regle.orderBy] < currentOrderBy ) {
                    addError(regle, resultJson)
                    break;
                }
                currentOrderBy = fields[i]._attributes[regle.orderBy];
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
        testOrdonnancementRules: testOrdonnancementRules

    }
}();

module.exports = Ordonnancement;
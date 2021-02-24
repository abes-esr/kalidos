import Parcours from "../utile/Parcours";

var Ordonnancement = function () {
    /**
     * Vérifie les règles de type Ordonnancement.
     * @param {String} categorie catégorie du document
     * @param {json} rules fichier de règle
     * @param {json} controlfields zone de contrôle
     * @param {json} datafields zone de données
     * @param {json} resultJson fichier de résultat
     */
    var testOrdonnancementRules = function (categorie, rules, controlfields, datafields, resultJson) {
        rules[categorie].ordonnancement.forEach(function (regle) {
            const fields = Parcours.findDataFields(datafields, regle.number);
            if (fields.length < 2) {
                return;
            }
            let currentOrderBy = fields[0]._attributes[regle.orderBy];
            for (let i in fields) {
                if (fields[i]._attributes[regle.orderBy] < currentOrderBy ) {
                    addError(regle, resultJson);
                    break;
                }
                currentOrderBy = fields[i]._attributes[regle.orderBy];
            }
        });
    }

    /**
     * Ajoute une erreur au fichier de résultat.
     * @param {json} regle 
     * @param {json} resultJson 
     */
    function addError(regle, resultJson) {
        resultJson.errors.push({
            message: regle.message,
            number: regle.number,
            numRuleExcell: regle.numRuleExcell
        });
        Parcours.addErrorSynchro();
    }


    return {
        testOrdonnancementRules: testOrdonnancementRules

    }
}();

export default Ordonnancement;
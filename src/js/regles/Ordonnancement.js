import Parcours from "../utile/Parcours";

var Ordonnancement = function () {
    /**
     * Verifie les regles de type Ordonnancement
     * @param {String} categorie categorie du document
     * @param {json} rules fichier de regle
     * @param {json} controlfields zone de controle
     * @param {json} datafields zone de données
     * @param {json} resultJson fichier de resultat
     */
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

    /**
     * ajoute une erreur au fichier de resultat
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
import Parcours from "../utile/Parcours";
import Condition from "../utile/Condition";

var Precedence = function () {
    /**
     * Vérifie les règles de type Precedence.
     * @param {String} categorie catégorie du document
     * @param {json} rules fichier de règle
     * @param {json} controlfields zone de contrôle
     * @param {json} datafields zone de données
     * @param {json} resultJson fichier de résultat
     */
    var testPrecedenceRules = function (categorie, rules, controlfields, datafields, resultJson) {
        rules[categorie].precedence.forEach(function (regle) {
           
            const fields = Parcours.findDataFields(datafields,regle.number)
            let fieldValid = [];
            for (let i in fields) {
                let checkedConds = true;
                regle.condition.forEach(function (condition) {
                    if (!Condition.checkCondition([], [fields[i]], condition)) {
                        checkedConds = false;
                    }
                });
                if(checkedConds) {
                    fieldValid.push(fields[i]);
                }
            }

            let valid = true ;
            for (let i in fieldValid) {
                const depart = fieldValid[i].subfield.findIndex(x => x._attributes.code === regle.precede.depart);
                const precedant = fieldValid[i].subfield.findIndex(x => x._attributes.code === regle.precede.precedant);
                if (depart - precedant !== 1 || depart == 0) {
                    valid = false;
                    break;
                }
            }

            if (!valid) {
                addError(regle, resultJson)
            }

        });
    }

    /**
     * Ajoute une erreur au fichier de résultat
     * @param {json} regle 
     * @param {json} resultJson 
     */
    function addError(regle, resultJson) {
        resultJson.errors.push({
            message: regle.message,
            number: regle.number,
            code: regle.condition[0].code,
            numRuleExcell: regle.numRuleExcell
        });
        Parcours.addErrorSynchro();
    }


    return {
        testPrecedenceRules: testPrecedenceRules

    }
}();

export default Precedence;
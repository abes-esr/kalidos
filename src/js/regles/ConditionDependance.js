import Parcours from "../utile/Parcours";
import Condition from "../utile/Condition";
import Dependance from "../regles/Dependance";


var ConditionDependance = function () {
    /**
     * teste les regles de type Condition Dependance
     * @param {String} categorie categorie de la regle a tester
     * @param {json} rules fichier de regles
     * @param {json} controlfields zones de controle
     * @param {json} datafields zone de données
     * @param {json} resultJson ficher de resultat
     */
    var testConditionDependanceRules = function (categorie, rules, controlfields, datafields, resultJson) {
        rules[categorie].ConditionDependance.forEach(function (regle) {

            var checkedConds = true;
            regle.condition.forEach(function (condition) {
                if (!Condition.checkCondition(controlfields, datafields, condition)) {
                    checkedConds = false;
                }
            });

            if (checkedConds) {
                // console.log("condition verifie");
                if (!Dependance.applyRuleOnFields(Parcours.findDataField(datafields, regle.field1.number), Parcours.findDataField(datafields, regle.field2.number), regle)) {
                    resultJson.errors.push({
                        message: regle.message,
                        number: regle.field1.number + " , " + regle.field2.number,
                        code: regle.field1.code + " , " + regle.field2.code,
                        numRuleExcell: regle.numRuleExcell
                    });
                    Parcours.addErrorSynchro();
                }
            }
        }
        );
    }

    return {
        testConditionDependanceRules: testConditionDependanceRules
    }
}();

export default ConditionDependance;
const Parcours = require("../utile/Parcours");
const Condition = require("../utile/Condition");
const Dependance = require("../regles/Dependance");


var ConditionStructurel = function() {

    var testConditionDependanceRules = function(rules, controlfields, datafields, resultJson) {
        rules.Generale.ConditionDependance.forEach(function(regle) {

                    var checkedConds = true;
                    regle.condition.forEach(function(condition) {
                        if (!Condition.checkCondition(controlfields, datafields, condition)) {
                            checkedConds = false;
                        }
                    });

                    if (checkedConds) {
                        if(Dependance.applyRuleOnFields(Parcours.findDataField(datafields, regle.field1.number), Parcours.findDataField(datafields, regle.field2.number), regle)) {
                            resultJson.errors.push({
                                message: regle.message,
                                number: regle.field1.number + " , " + regle.field2.number,
                                code: regle.field1.code + " , " + regle.field2.code
                            });
                        }
                    }
            }
        );
    }

    return {
        testConditionDependanceRules: testConditionDependanceRules
    }
}();

module.exports = ConditionStructurel;
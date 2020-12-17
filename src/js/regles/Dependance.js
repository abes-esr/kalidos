const Parcours = require("../utile/Parcours");

/* 
Dependance
- 100$a = 214$d
- 100 $a >$e
- 101 $a >=$f
 */

var Dependance = function () {


    function applyRuleOnFields(field1, field2, regle) {

        if (field1 != null && field2 != null) {
            const subfield1 = Parcours.getSubfieldValue(field1, regle.field1.code)
            const subfield2 = Parcours.getSubfieldValue(field2, regle.field2.code)
            if (subfield2 == null) {
                return false
            }
            else if (subfield1 != null && subfield2 != null) {
                let testString1 = subfield1
                let testString2 = subfield2

                if (regle.field1.pos && regle.field1.pos.length > 0) {
                    testString1 = subfield1.slice(regle.field1.pos[0], regle.field1.pos[1])
                }
                if (regle.field2.pos && regle.field2.pos.length > 0) {
                    testString2 = subfield2.slice(regle.field2.pos[0], regle.field2.pos[1])
                }

                if (regle.operator === "equals") {
                    //console.log(testString1, " === ", testString2, "->", testString1 === testString2)
                    return testString1 === testString2;
                }
                else if (regle.operator === "not_equals") {
                    // console.log("yes");
                    //console.log(testString1, " === ", testString2, "->", testString1 === testString2)
                    return testString1 !== testString2;
                }
                else if (regle.operator === "greater") {
                    return testString1 > testString2;
                    // return subfield1 > subfield2;
                }
                else if (regle.operator === "lesser") {
                    return testString1 < testString2;
                    // return subfield1 < subfield2;
                }
                else if (regle.operator === "greaterEquals") {
                    return testString1 >= testString2;
                    // return subfield1 >= subfield2;
                }
                else if (regle.operator === "lesserEquals") {
                    return testString1 <= testString2;
                    // return subfield1 <= subfield2;
                }
            }
        } 
        return true
    }



    var testMatchDependanceRules = function (categorie,rules, controlfields, datafields, resultJson) {
        rules[categorie].dependances.forEach(function (regle) {
            const field1 = Parcours.findDataField(datafields, regle.field1.number)
            const field2 = Parcours.findDataField(datafields, regle.field2.number)
            if (!applyRuleOnFields(field1, field2, regle)) {

                resultJson.errors.push({
                    message: regle.message,
                    number: regle.field1.number + " , " + regle.field2.number,
                    code: regle.field1.code + " , " + regle.field2.code
                });
            }

        });
    }

    return {
        testMatchDependanceRules: testMatchDependanceRules,
        applyRuleOnFields: applyRuleOnFields
    }
}();

module.exports = Dependance;
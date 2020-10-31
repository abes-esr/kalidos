const Parcours = require("./Parcours");

/* 
Dependance
- 100$a = 214$d
- 100 $a >$e
- 101 $a >=$f
 */

var Dependance = function () {



    function applyRuleOnFields(field1,field2,regle){
        if(field1 != null && field2 != null) {
             const subfield1 = Parcours.getSubfieldValue(field1,regle.field1.code)
             const subfield2 = Parcours.getSubfieldValue(field2,regle.field2.code)

             if(subfield1 != null && subfield2 != null) {
                 if(regle.operator === "equals") {
                    //console.log(subfield1);
                    //console.log(subfield2);
                    return subfield1 === subfield2;
                 } 
                 else if(regle.operator === "greater") {
                    return subfield1 > subfield2;
                 } 
                 else if(regle.operator === "lesser") {
                    return subfield1 < subfield2;
                 } 
                 else if(regle.operator === "greaterEquals") {
                    return subfield1 >= subfield2;
                 } 
                 else if(regle.operator === "lesserEquals") {
                    return subfield1 <= subfield2;
                 } 
                }
             }
             return true
        }
        
    

    var testMatchDependanceRules = function (rules, controlfields, datafields, resultJson) {
        rules.Generale.dependances.forEach(function (regle) {
            const field1 = Parcours.findDataField(datafields, regle.field1.number)
            const field2 = Parcours.findDataField(datafields, regle.field2.number)
            if(!applyRuleOnFields(field1,field2,regle)){

                resultJson.errors.push({
                    message: regle.message,
                    number: regle.field1.number + " , " + regle.field2.number,
                    code:  regle.field1.code + " , " + regle.field2.code
                });
            }

        });
    }

    return {
        testMatchDependanceRules : testMatchDependanceRules
    }
}();

module.exports = Dependance;
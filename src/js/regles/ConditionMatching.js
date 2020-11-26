const Parcours = require("../utile/Parcours");
const Condition = require("../utile/Condition");
const axios = require('axios');
const convert = require("xml-js");
const Matching = require("../regles/Matching");


var ConditionStructurel = function() {

    var testConditionMatchingRules = function(rules, controlfields, datafields, resultJson) {
        rules.Generale.ConditionMatching.forEach(function(regle) {
            //recuperation du datafield
            var checkedConds = true;
            regle.condition.forEach(function(condition) {
                if (!Condition.checkCondition(controlfields, datafields, condition)) {
                    checkedConds = false;
                }
            });

            if (checkedConds) {
                console.log("condition verifie");

                if (regle.reciproque) {
                    var field = Parcours.findDataField(datafields, regle.reciproque.number);
                    var ppnDest = Parcours.getSubfieldValue(field, regle.reciproque.code);

                    axios.get("https://www.sudoc.fr/" + ppnDest + ".xml")
                        .then(function(response) {
                            const data = JSON.parse(
                                convert.xml2json(response.data, {
                                    compact: true,
                                    spaces: 2
                                })
                            );
                            checkValues(regle , data.record.datafield , data.record.controlfield, resultJson)

                        })
                        .catch(function(error) {
                            console.log("error matching reciproque");
                        })
                } else {
                    checkValues(regle , datafields , controlfields, resultJson)
                }
            }

        });
    }

    function checkValues(regle , datafields , controlfields, resultJson){
        if(regle.type === "allRequired" && regle.values.length > 0){
            for (var index in regle.values){
                const value = regle.values[index];
                let res = {errors: []};
                Matching.testMatchRegexNumber(value, datafields, controlfields, res);
                if (res.errors.length > 0) {
                    resultJson.errors.push({
                        message: regle.message,
                        number: regle.number,
                    });
                    return ;
                }
            }
        }else if(regle.type === "oneRequired" && regle.values.length > 0){
            for (var index in regle.values){
                const value = regle.values[index];
                let res = {errors: []};
                Matching.testMatchRegexNumber(value, datafields, controlfields, res);
                if (res.errors.length === 0) {
                    return ;
                }
            }
            resultJson.errors.push({
                message: regle.message,
                number: regle.number,
            });
        }
    }



    return {
        testConditionMatchingRules: testConditionMatchingRules
    }
}();

module.exports = ConditionStructurel;
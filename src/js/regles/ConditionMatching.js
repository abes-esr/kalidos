const Parcours = require("../utile/Parcours");
const Condition = require("../utile/Condition");
const axios = require('axios');
const convert = require("xml-js");
const Matching = require("../regles/Matching");


var ConditionStructurel = function() {

    var testConditionMatchingRules = function(rules, controlfields, datafields, resultJson) {
        rules.Generale.ConditionMatching.forEach(function(regle) {
            //recuperation du datafield
            var field1 = Parcours.findDataField(datafields, regle.number);
            //si c'est pas un datafield on verifie dans controllefields
            if (field1 == null) {
                field1 = Parcours.findDataField(controlfields, regle.number);
            }
            if (field1 != null) {
                var checkedConds = true;
                regle.condition.forEach(function(condition) {
                    if (!Condition.checkCondition(controlfields, datafields, condition)) {
                        checkedConds = false;
                    }
                });

                if (checkedConds) {
                    let res = {
                        errors: [],
                    };
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
                                Matching.testMatchRegexNumber(regle, data.record.datafield, data.record.controlfield, res);
                                if (res.errors.length > 0) {
                                    resultJson.errors.push({
                                        message: regle.message,
                                        number: regle.number,
                                    });
                                }
                            })
                            .catch(function(error) {
                                console.log("error matching reciproque");
                            })
                    } else {
                        Matching.testMatchRegexNumber(regle, datafields, controlfields, res);
                        if (res.errors.length > 0) {
                            resultJson.errors.push({
                                message: regle.message,
                                number: regle.number,
                            });
                        }
                    }
                }
            }
        });
    }

    return {
        testConditionMatchingRules: testConditionMatchingRules
    }
}();

module.exports = ConditionStructurel;
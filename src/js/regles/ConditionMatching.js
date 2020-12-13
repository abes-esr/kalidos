const Parcours = require("../utile/Parcours");
const Condition = require("../utile/Condition");
const axios = require('axios');
const convert = require("xml-js");
const Matching = require("../regles/Matching");


var ConditionStructurel = function () {

    var testConditionMatchingRules = function (rules, controlfields, datafields, resultJson) {
        rules.Generale.ConditionMatching.forEach(function (regle) {
            //recuperation du datafield
            var checkedConds = true;
            regle.condition.forEach(function (condition) {
                if (!Condition.checkCondition(controlfields, datafields, condition)) {
                    checkedConds = false;
                }
            });

            if (checkedConds) {
                // console.log("condition verifie");

                if (regle.reciproque) {
                    var field = Parcours.findDataField(datafields, regle.reciproque.number);
                    var ppnDest = Parcours.getSubfieldValue(field, regle.reciproque.code);

                    axios.get("https://www.sudoc.fr/" + ppnDest + ".xml")
                        .then(function (response) {
                            const data = JSON.parse(
                                convert.xml2json(response.data, {
                                    compact: true,
                                    spaces: 2
                                })
                            );
                            checkValues(regle, data.record.datafield, data.record.controlfield, resultJson)

                        })
                        .catch(function (error) {
                            console.log("error matching reciproque");
                        })
                } else {
                    checkValues(regle, datafields, controlfields, resultJson)
                }
            }

        });
    }

    function checkValues(regle, datafields, controlfields, resultJson) {
        let isOk = true;
        if (regle.type === "allRequired") {
            isOk = verifyAllRequired(regle, datafields, controlfields);
        } else if (regle.type === "oneRequired") {
            isOk = verifyOneRequired(regle, datafields, controlfields);
        }
        if(!isOk) {
            resultJson.errors.push({
                message: regle.values[0].message,
                number: regle.values[0].number,
            });
        }
    }



    return {
        testConditionMatchingRules: testConditionMatchingRules
    }
}();

module.exports = ConditionStructurel;

function verifyOneRequired(regle, datafields, controlfields) {
    for (let index in regle.values) {
        // Soit le champ n'est pas requis et on continue
        // Soit il est requis et on vérifie son existence
        let resultOnOneRule = !regle.values[index].subFieldRequired || isDatafieldExist(datafields, regle, index);
        resultOnOneRule = resultOnOneRule && verifyOneRule(regle, index, datafields, controlfields);
        if (resultOnOneRule) {
            return true;
        }
    }
    return false;
}

function verifyAllRequired(regle, datafields, controlfields) {
    for (let index in regle.values) {
        // Soit le champ n'est pas requis et on continue
        // Soit il est requis et on vérifie son existence
        let resultOnOneRule = !regle.values[index].subFieldRequired || isDatafieldExist(datafields, regle, index);
        resultOnOneRule = resultOnOneRule && verifyOneRule(regle, index, datafields, controlfields);
        if (!resultOnOneRule) {
            return false;
        }
    }
    return true;
}

function verifyOneRule(regle, index, datafields, controlfields) {
    const value = regle.values[index];
    let res = { errors: [] };
    Matching.testMatchRegexNumber(value, datafields, controlfields, res);
    return res.errors.length === 0;
}

function isDatafieldExist(datafields, regle,index) {
    const number = regle.values[index].number;
    const code = regle.values[index].code;
    const ind1 = regle.values[index].ind1;
    const ind2 = regle.values[index].ind2;
    let datafield
    if(ind1 === undefined || ind2 === undefined) {
        datafield = Parcours.findDataField(datafields,number);
    } else {
        datafield = Parcours.findDataFieldById(datafields,number,ind1,ind2);
    }
    if(datafield != null) {
        const subfield = Parcours.getSubfieldValue(datafield,code);
        return subfield != null;
    }
    return false;
}
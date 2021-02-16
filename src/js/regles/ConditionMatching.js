import Parcours from "../utile/Parcours";
import Condition from "../utile/Condition";
import Matching from "../regles/Matching";
const axios = require('axios');
const convert = require("xml-js");



let ConditionMatching = function () {
    let getDocument = undefined;
    let ppnInitiale = undefined;
    let testConditionMatchingRules = async function (categorie, rules, controlfields, datafields, resultJson, getfunctionDocument) {
        getDocument = getfunctionDocument;
        for (let iRegle in rules[categorie].ConditionMatching) {
            const regle = rules[categorie].ConditionMatching[iRegle];
            //recuperation du datafield
            let checkedConds = true;
            regle.condition.forEach(function (condition) {
                if (!Condition.checkCondition(controlfields, datafields, condition)) {
                    checkedConds = false;
                }
            });

            if (checkedConds) {

                let checkControlFields = controlfields;
                let checkDataFields = datafields;
                if (regle.reciproque) {
                    ppnInitiale = Parcours.findDataField(controlfields, "001")._text;
                    const data = await getDocument(datafields, regle, resultJson);
                    console.log("data : " , data)
                    if (data === null) {
                        console.log("data === null")
                        addError(resultJson, regle);
                        console.log(resultJson)
                        return;
                    }
                    checkControlFields = data.record.controlfield;
                    checkDataFields = data.record.datafield;
                }

                if (!checkValues(regle, checkDataFields, checkControlFields)) {
                    console.log("checkValues(regle, checkDataFields, checkControlFields)")
                    addError(resultJson, regle);
                }
            }
        }
    }

    async function getDataOnSudoc(datafields, regle, resultJson) {
        let field = Parcours.findDataField(datafields, regle.reciproque.number);
        let ppnDest = Parcours.getSubfieldValue(field, regle.reciproque.code);

        const result = await axios.get("https://www.sudoc.fr/" + ppnDest + ".xml")
            .then(function (response) {
                const xml = response.data.replaceAll('&', '')
                const data = JSON.parse(
                    convert.xml2json(xml, {
                        compact: true,
                        spaces: 2
                    })
                );
                console.log(data)
                return data;
            })
            .catch(function (error) {
                console.log(error)
                addError(resultJson, regle);
                return null

            });
        return result;
    }


    function addError(resultJson, regle) {
        resultJson.errors.push({
            message: regle.message,
            number: regle.number,
        });
        Parcours.addErrorSynchro();
    }

    function checkValues(regle, datafields, controlfields) {
        let isOk = true;
        // if(regle.reciproque !== undefined) {
        //     isOk = isOk && checkReciproque(datafields, regle.reciproque.number, regle.reciproque.code);
        // }
        if (regle.type === "allRequired") {
            isOk = isOk && verifyAllRequired(regle, datafields, controlfields);
        } else if (regle.type === "oneRequired") {
            isOk = isOk && verifyOneRequired(regle, datafields, controlfields);
        }
        return isOk;
    }


    function mockGetDataOnSudoc(number) {
        return function (datafields, number2, code) {
            return getNotice(number)
        }
    }


    function getNotice(number) {
        const xmlPPN = fs.readFileSync(path.join(__dirname, '../testRegles/testClient/data/' + number + '.xml'), 'utf8');
        return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
    }


    function verifyAllRequired(regle, datafields, controlfields) {
        for (let index in regle.values) {
            // Soit le champ n'est pas requis et on continue
            // Soit il est requis et on vérifie son existence

            let resultOnOneRule = !regle.values[index].subFieldRequired || isDatafieldExist(datafields, controlfields, regle, index);
            resultOnOneRule = resultOnOneRule && verifyOneRule(regle, index, datafields, controlfields);

            if (!resultOnOneRule) {
                return false;
            }
        }
        return true;
    }

    function verifyOneRequired(regle, datafields, controlfields) {
        for (let index in regle.values) {
            // Soit le champ n'est pas requis et on continue
            // Soit il est requis et on vérifie son existence

            let resultOnOneRule = !regle.values[index].subFieldRequired || isDatafieldExist(datafields, controlfields, regle, index);
            resultOnOneRule = resultOnOneRule && verifyOneRule(regle, index, datafields, controlfields);

            if (resultOnOneRule) {
                return true;
            }
        }
        return false;
    }

    function checkReciproque(datafields, number, code) {

        let tempDataField = Parcours.findDataField(datafields, number);
        if (tempDataField == null) {
            return false;
        }
        const subfieldValue = Parcours.getSubfieldValue(tempDataField, code);
        return subfieldValue === ppnInitiale;
    }

    function verifyOneRule(regle, index, datafields, controlfields) {
        const value = regle.values[index];
        let res = { errors: [] };
        let fields = datafields;
        if (regle.verifyZone != undefined) {
            fields = Parcours.getAllDatafieldVerifyZone(datafields, regle.verifyZone.number, regle.verifyZone.code);
        }
        Matching.testMatchRegexNumber(value, fields, controlfields, res);
        return res.errors.length === 0;
    }

    function isDatafieldExist(datafields, controlfields, regle, index) {
        const number = regle.values[index].number;
        const code = regle.values[index].code;
        const ind1 = regle.values[index].ind1;
        const ind2 = regle.values[index].ind2;
        let datafield
        if (ind1 === undefined || ind2 === undefined) {
            datafield = Parcours.findDataField(datafields, number);
            // Si on trouve pas dans les dataFields on check dans les controlFields(les controfields ne possèdent pas d'indice)
            if (datafield == null) {
                // Les controfields ne possèdent pas de sous zone
                // Donc on vérifie seulement si on l'a trouvé
                const controfield = Parcours.findDataField(controlfields, number);
                return controfield != null;
            }
        } else {
            datafield = Parcours.findDataFieldById(datafields, number, ind1, ind2);
        }
        if (datafield != null) {
            const subfield = Parcours.getSubfieldValue(datafield, code);
            return subfield != null;
        }
        return false;
    }


    return {
        testConditionMatchingRules: testConditionMatchingRules,
        getDataOnSudoc: getDataOnSudoc
    }
}();

// module.exports = ConditionMatching;
export default ConditionMatching;

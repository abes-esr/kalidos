const Parcours = require("../utile/Parcours");
const Condition = require("../utile/Condition");
const axios = require('axios');
const convert = require("xml-js");


const ConditionStructurel = function () {
    let getDocument = undefined;
    let ppnInitiale = undefined;
    const testConditionStrucutrelRules = function (rules, controlfields, datafields, resultJson, getfunctionDocument) {
        getDocument = getfunctionDocument
        rules.Generale.ConditionStructurel.forEach(function (regle) {
            //recuperation du field a testé
            let dataField = Parcours.findDataField(datafields, regle.number);
            //si c'est pas un datafield en cherche dans controllefield
            if (dataField == null) {
                dataField = Parcours.findDataField(controlfields, regle.number);
            }
            if (dataField == null) {
                for (let i in regle.value) {
                    if (regle.value[i].number === regle.number && regle.value[i].present === false) {
                        return;
                    }
                }
                addError(resultJson, regle);
                return null;
            }

            //si on le field on check les conditions
            let checkedConds = true;
            regle.condition.forEach(function (condition) {
                if (!Condition.checkCondition(controlfields, datafields, condition)) {
                    checkedConds = false;
                }
            });
            //si les conditions sont vrai
            if (checkedConds) {
                //notice courante

                let checkControlFields = controlfields;
                let checkDataFields = datafields;
                if (regle.reciproque) {
                    ppnInitiale = Parcours.findDataField(controlfields, "001")._text;

                    //si les verification sont sur la notice reciproque
                    const data = getDocument(datafields, regle.reciproque.number, regle.reciproque.code);
                    if(data === null) {
                        addError(resultJson, regle);
                        return;
                    }
                    checkControlFields = data.record.controlfield;
                    checkDataFields = data.record.datafield;

                }

                if (!checkValues(regle, checkControlFields, checkDataFields)) {
                    addError(resultJson, regle);
                }
            }

        });
    }

    function checkValues(regle, controlfields, datafields) {
        if (regle.type.toString() === "allRequired") {
            for (let i in regle.value) {
                const result = verifyOne(datafields, regle.value[i], controlfields, checkReciproque);
                if (!result) {
                    return false;
                }
            }
            return true;
        } else if (regle.type.toString() === "oneRequired") {
            for (let i in regle.value) {
                const result = verifyOne(datafields, regle.value[i], controlfields, checkReciproque);
                if (result) {
                    return true;
                }
            }
            return false;

        }

        return isCheckValues;
    }


    function checkReciproque(datafields, number, code) {

        // let data = getDocument(datafields, number, code);
        // if (data == null) {
        //     return false;
        // }

        let tempDataField = Parcours.findDataField(datafields, number);
        if (tempDataField == null) {
            return false;
        }
        const subfieldValue = Parcours.getSubfieldValue(tempDataField, code);
        return subfieldValue === ppnInitiale;
    }

    return {
        testConditionStrucutrelRules: testConditionStrucutrelRules,
        getDataOnSudoc: getDataOnSudoc
    }
}();

module.exports = ConditionStructurel;

function verifyOne(datafields, value, controlfields, checkReciproque) {
    const listDatafield = getListDatafield(datafields, value);
    let result = verifyPresence(value, listDatafield);
    result = result || verifyIndex(value, listDatafield);
    result = result || verifyReciproque(value, controlfields, checkReciproque, datafields);
    return result;
}

function verifyPresenceSubfield(value, listDatafield) {
    const subfield = Parcours.getSubfieldValue(listDatafield[0], value.code);
    if ((subfield != null) === value.present) {
        return true;
    }
    return false;
}

function verifyPresenceField(value, listDatafield) {
    const dataNotMustBePresent = !value.present && listDatafield.length === 0;
    const dataMustPresent = value.present && listDatafield.length > 0;
    return dataNotMustBePresent || dataMustPresent;
}

function verifyPresence(value, listDatafield) {
    if (value.reciproque === undefined) {
        if (value.code.toString() !== "") {
            return verifyPresenceSubfield(value, listDatafield);
        } else if (value.ind1 === undefined || value.ind2 === undefined) {
            return verifyPresenceField(value, listDatafield);
        }
    }
    return false;
}

function verifyIndex(value, listDatafield) {
    if ((listDatafield.length !== 0) && value.present) {
        const ind1IsOk = value.ind1 === listDatafield[0]._attributes.ind1.toString().trim();
        const ind2IsOk = value.ind2 === listDatafield[0]._attributes.ind2.toString().trim();
        if (ind1IsOk && ind2IsOk) {
            return true;
        }
    }
    return false;
}

function verifyReciproque(value, controlfields, checkReciproque, datafields) {
    if (value.reciproque) {
        // const dataField001 = Parcours.findDataField(controlfields, "001");
        return checkReciproque(datafields, value.reciproque.number, value.reciproque.code);
    }
    return false;
}

function addError(resultJson, regle) {
    resultJson.errors.push({
        message: regle.message,
        number: regle.number,
    });
}

function getListDatafield(datafields, value) {
    let dataField = Parcours.findDataFields(datafields, value.number);
    if (value.ind1 !== undefined && value.ind1 !== "") {
        dataField = Parcours.filterDatafield(dataField, "ind1", value.ind1);
    }
    if (value.ind2 !== undefined && value.ind2 !== "") {
        dataField = Parcours.filterDatafield(dataField, "ind2", value.ind2);
    }
    return dataField;
}

function getDataOnSudoc(datafields, number, code) {
    const dataField = Parcours.findDataField(datafields, number);
    const ppnDest = Parcours.getSubfieldValue(dataField, code);

    if (ppnDest !== null) {
        axios.get("https://www.sudoc.fr/" + ppnDest + ".xml")
            .then(function (response) {
                const data = JSON.parse(
                    convert.xml2json(response.data, { compact: true, spaces: 2 })
                );
                return data;

            })
            .catch(function (error) {
                console.log("error matching reciproque");
            });
    }
    return null;
}



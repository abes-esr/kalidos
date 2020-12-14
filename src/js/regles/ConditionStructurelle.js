const Parcours = require("../utile/Parcours");
const Condition = require("../utile/Condition");
const axios = require('axios');
const convert = require("xml-js");


var ConditionStructurel = function () {
    var getDocument = undefined;
    var testConditionStrucutrelRules = function (rules, controlfields, datafields, resultJson , getfunctionDocument) {
        getDocument = getfunctionDocument
        rules.Generale.ConditionStructurel.forEach(function (regle) {
            //recuperation du field a testé
            let dataField = Parcours.findDataField(datafields, regle.number);
            //si c'est pas un datafield en cherche dans controllefield
            if (dataField == null) {
                dataField = Parcours.findDataField(controlfields, regle.number);
            }
            if (dataField == null) {
               for(let i in regle.value) {
                   if(regle.value[i].number === regle.number && regle.value[i].present === false ) {
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
                // console.log("condition verifié");
                if (regle.reciproque) {
                    //si les verification sont sur la notice reciproque
                    const data = getDocument(datafields, regle.reciproque.number, regle.reciproque.code);
                    console.log(data);
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

        let isCheckValues;
        if (regle.type.toString() === "allRequired") {
            isCheckValues = true;
            regle.value.forEach(function (value) {
                const listDatafield = getListDatafield(datafields, value);
                if (value.code.toString() !== "") {
                    const subfield = Parcours.getSubfieldValue(listDatafield[0], value.code);
                    if ((subfield != null) != value.present) {
                        isCheckValues = false;
                    }
                    else if (value.reciproque) {
                        const dataField001 = Parcours.findDataField(controlfields, "001");
                        isCheckValues = checkReciproque(dataField001, datafields, value.reciproque.number, value.reciproque.code);
                    }
                }
                else if ((listDatafield.length === 0) === value.present) {
                    isCheckValues = false;
                }

            });
        } else if (regle.type.toString() === "oneRequired") {
            isCheckValues = false;
            regle.value.forEach(function (value) {
                const listDatafield = getListDatafield(datafields, value);
                if (value.code.toString() !== "") {
                    const subfield = Parcours.getSubfieldValue(listDatafield[0], value.code);
                    if ((subfield != null) === value.present) {
                        isCheckValues = true;
                    }

                } else if ((listDatafield.length !== 0) === value.present) {
                    const ind1IsOk = value.ind1 === listDatafield[0]._attributes.ind1.toString().trim();
                    const ind2IsOk = value.ind2 === listDatafield[0]._attributes.ind2.toString().trim();
                    if (!value.ind1 || (ind1IsOk && ind2IsOk)) {
                        isCheckValues = true;
                    }

                } else if (value.reciproque) {
                    const dataField001 = Parcours.findDataField(controlfields, "001");
                    isCheckValues = checkReciproque(dataField001, datafields, value.reciproque.number, value.reciproque.code);
                }

            });

        }

        return isCheckValues;

    }


    function checkReciproque(ppnSource, datafields, number, code) {

        let data = getDocument(datafields, number, code);
        if (data == null) {
            return false;
        }

        let tempDataField = Parcours.findDataField(data.record.datafield, number);
        if (tempDataField == null) {
            return false;
        }
        return Parcours.getSubfieldValue(tempDataField, code) === ppnSource;
    }

    return {
        testConditionStrucutrelRules: testConditionStrucutrelRules,
        getDataOnSudoc: getDataOnSudoc,
        mockGetDataOnSudoc: mockGetDataOnSudoc
    }
}();

module.exports = ConditionStructurel;

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

function mockGetDataOnSudoc(number) {
    return function(datafields, number2, code) {
        return getNotice(number)
    }
}


function getNotice(number) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'testRegles/testClient/data/Notice' + number + '.xml'), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}
import Parcours from "../utile/Parcours";
import Condition from "../utile/Condition";
const axios = require('axios');
const convert = require("xml-js");


const ConditionStructurel = function () {
    let getDocument = undefined;
    let ppnInitiale = undefined;

    /**
     * Verifie que les regles de type Condition Structurelle sont valide
     * @param {String} categorie categorie de document
     * @param {json} rules fichier de regles
     * @param {json} controlfields zone de controle
     * @param {json} datafields zone de données
     * @param {json} resultJson fichier de resultat
     * @param {function} getfunctionDocument fonction pour recuperer un PPN
     */
    const testConditionStrucutrelRules = async function (categorie, rules, controlfields, datafields, resultJson, getfunctionDocument) {
        getDocument = getfunctionDocument
        for (let iRegle in rules[categorie].ConditionStructurel) {
            const regle = rules[categorie].ConditionStructurel[iRegle];

            //si on le field on check les conditions
            let checkedConds = true;
            regle.condition.forEach(function (condition) {
                if (!Condition.checkCondition(controlfields, datafields, condition)) {
                    checkedConds = false;
                }

            });
            //recuperation du field a testé
            //si les conditions sont vrai
            if (checkedConds) {
                //notice courante
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
                
                let checkControlFields = controlfields;
                let checkDataFields = datafields;
                if (regle.reciproque) {
                    ppnInitiale = Parcours.findDataField(controlfields, "001")._text;

                    //si les verification sont sur la notice reciproque
                    const data = await getDocument(datafields, regle.reciproque.number, regle.reciproque.code);
                    if (data === null) {
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
        }
    }

    /**
     * Verifie que le contenue des champ est valide
     * @param {json} regle regle courante 
     * @param {json} controlfields zone de controle
     * @param {json} datafields zone de données
     */
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

    /**
     * verifie la reciprocité des PPN
     * @param {json} datafields zone de données
     * @param {String} number identifiant du datafield
     * @param {String} code code du subfield
     */
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

// module.exports = ConditionStructurel;
export default ConditionStructurel;

/**
 * verifie qu'une regle est valide
 * @param {json} datafields zone de données
 * @param {json} value implication de la regle
 * @param {json} controlfields zone de controle
 * @param {function} checkReciproque fonction qui verifie la reciprocité
 */
function verifyOne(datafields, value, controlfields, checkReciproque) {
    
    const listDatafield = getListDatafield(datafields, value);
    let result = verifyPresence(value, listDatafield);
    result = result || verifyIndex(value, listDatafield);
    result = result || verifyReciproque(value, controlfields, checkReciproque, datafields);
    return result;
}

/**
 * verifie qu'un subfield est present
 * @param {json} value implication de la regle
 * @param {json} listDatafield liste de datafield
 */
function verifyPresenceSubfield(value, listDatafield) {
    const subfield = Parcours.getSubfieldValue(listDatafield[0], value.code);
    const isExist = subfield != null
    if (isExist === value.present) {
        return true;
    }
    return false;
}

/**
 * verifie la presence ou non d'un datafield
 * @param {*} value implication de la regle
 * @param {*} listDatafield liste de datafield
 */
function verifyPresenceField(value, listDatafield) {
    const dataNotMustBePresent = !value.present && listDatafield.length === 0;
    const dataMustPresent = value.present && listDatafield.length > 0;
    return dataNotMustBePresent || dataMustPresent;
}


/**
 * verifie si un champ doit etre present ou non
 * @param {*} value implication de la regle
 * @param {*} listDatafield liste de datafield
 */
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

/**
 * verifie si les index d'un datafield sont correcte
 * @param {*} value implication de la regle
 * @param {*} listDatafield liste de datafield
 */
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

/**
 * 
 * @param {json} value implication de la regle
 * @param {json} controlfields zone de controle
 * @param {json} checkReciproque fonction qui teste la reciprocité 
 * @param {json} datafields zone de données
 */
function verifyReciproque(value, controlfields, checkReciproque, datafields) {
    if (value.reciproque) {
        // const dataField001 = Parcours.findDataField(controlfields, "001");
        return checkReciproque(datafields, value.reciproque.number, value.reciproque.code);
    }
    return false;
}

/**
 * Ajoute une erreur dans le fichier de resultat
 * @param {json} resultJson fichier de resultat
 * @param {json} regle regle courante
 */
function addError(resultJson, regle) {
    resultJson.errors.push({
        message: regle.message,
        number: regle.number,
        code: regle.condition[0].code
    });
    Parcours.addErrorSynchro();
}

/**
 * recupere une liste de datafield
 * @param {json} datafields zone de données
 * @param {json} value implication de la regle
 */
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

/**
 * Recupere le PPN sur le sudoc
 * @param {json} datafields champ de données
 * @param {String} number identifiant du datafield
 * @param {String} code code du subfield
 */
async function getDataOnSudoc(datafields, number, code) {
    const dataField = Parcours.findDataField(datafields, number);
    const ppnDest = Parcours.getSubfieldValue(dataField, code);

    if (ppnDest !== null) {
        const result = await axios.get("https://www.sudoc.fr/" + ppnDest + ".xml")
            .then(function (response) {
                const xml = response.data.replaceAll('&', '')
                const data = JSON.parse(
                    convert.xml2json(xml, { compact: true, spaces: 2 })
                );
                return data;
                    
            })
            .catch(function (error) {
                console.log("error matching reciproque");
                return null;
            });
            return result
    }
    return null
    
}



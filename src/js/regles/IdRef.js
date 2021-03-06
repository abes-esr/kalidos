import Parcours from "../utile/Parcours";
const convert = require("xml-js");
const axios = require('axios');



var IdRef = function () {
    /**
     * Récupère un PPN sur le serveur externe IDREF.
     * @param {String} identifiant PPN à récupérer
     * @param {json} regle règle courante
     * @param {json} resultJson fichier de résultat
     */
    var getRequest = function (identifiant, regle, resultJson) {
        axios.get("https://www.idref.fr/" + identifiant + ".xml")
            .then(function (response) {
                const xml = response.data.replaceAll('&', '')
                const data = JSON.parse(
                    convert.xml2json(xml, { compact: true, spaces: 2 })
                );
                validateIdRef(data, regle, resultJson)
            })
            .catch(function (error) {
                //console.log("avant : " , resultJson)
                addError(regle, resultJson);
                //console.log("apres : " , resultJson)
            })
    }

    /**
     * Vérifie que le document IDREF est valide.
     * @param {json} data données du documents IDREF
     * @param {json} regle règle courante
     * @param {json} resultJson fichier de résultat
     */
    var validateIdRef = function (data, regle, resultJson) {
        const controlfield = data.record.controlfield;
        const field = Parcours.findDataField(controlfield, regle.verification.number)
        const regex = RegExp(regle.verification.regex);
        let valid = false
        if (field != null) {
            const value = field._text
            if (RegExp(regex).test(value)) {
                valid = true
            }
        }

        if (!valid) {
            //console.log("regle : " , regle.numRuleExcell)
            addError(regle, resultJson)
            //console.log(resultJson.errors)
        }
    }

    /**
     * Vérifie que la valeur du subfield est valide.
     * @param {json} field datafield à tester
     * @param {String} code code du subfield à tester
     * @param {String} regex regex à matcher
     */
    var testValueCode = function (field, code, regex) {
        const subfield = Parcours.getSubfieldValue(field, code)
        const regExp = RegExp(regex);
        if (subfield != null) {
            //console.log(subfield , " " , regex , " ",RegExp(regExp).test(subfield))
            return RegExp(regExp).test(subfield)
        } else {
            return false
        }
    }

    /**
     * Filtre une liste selon la valeur.
     * @param {Array} array liste à filtrer
     * @param {*} value valeur filtre
     */
    function remove(array, value) {
        array = array.filter(function (item) {
            return item !== value
        })
    }
    /**
     * Teste la condition de la regle .
     * @param {json} datafields 
     * @param {json} regle 
     */
    var conditionNotice = function (datafields, regle) {
        let retour = [];
        let valid = true;
        const fields = Parcours.findDataFields(datafields, regle.condition[0].number)
        for (let j in fields) {
            valid = true;
            for (let i in regle.condition) {
                if (regle.condition[i].code != null && regle.condition[i].regex != null) {
                    valid = testValueCode(fields[j], regle.condition[i].code, regle.condition[i].regex)
                }
                else if (regle.condition[i].code != null) {
                    valid = Parcours.testCode(fields[j], regle.condition[i].code)
                } else {
                    valid = fields[j] != null
                }
                if(!valid) {
                    break;
                }
            }
            if (valid) {
                retour.push(fields[j])
            }
        }
        return retour
    }


    /**
     * Vérifie qu'un datafield n'existe pas.
     * @param {json} datafields zone de données
     * @param {json} regle règle courante
     */
    function validEmptyArray(datafields, regle) {
        const fields = Parcours.findDataFields(datafields, regle.condition[0].number)
        return !fields.length > 0
    }

    /**
     * Ajoute une erreur au fichier résultat.
     * @param {json} regle règle courante
     * @param {json} resultJson fichier résultat
     */
    function addError(regle, resultJson) {
        resultJson.errors.push({
            message: regle.message + " ( " + regle.index + " ) ",
            number: regle.identifiant.number,
            code: regle.identifiant.code,
            numRuleExcell: regle.numRuleExcell
        });
        Parcours.addErrorSynchro();
    }


    /**
     * Récupère l'identifiant à utiliser pour requêter le serveur externe.
     * @param {json} datafields zone de données
     * @param {json} regle règle courante
     */
    var identifiantNotice = function (fields, regle) {
        let identifiant = [];
        let idValue;
        for (let i in fields) {
            if (regle.condition[0].code != null) {
                idValue = Parcours.getIdentifiantValue(fields[i], regle.condition[0].code, regle.identifiant.code);
                if (idValue != null) {
                    identifiant.push(idValue);
                }

            } else {
                idValue = Parcours.getSubfieldValue(fields[i], regle.identifiant.code);
                if (idValue != null) {
                    identifiant.push(idValue);
                }
            }
        }

        return identifiant;
    }

    /**
     * Valide les règles de type Idref.
     * @param {String} categorie catégorie du document
     * @param {json} rules fichier de règle
     * @param {json} controlfields zone de contrôle
     * @param {json} datafields zone de données
     * @param {json} resultJson fichier de résultat
     */
    var testIdRefRules = function (categorie, rules, controlfields, datafields, resultJson) {
        rules[categorie].idRef.forEach(function (regle) {
            const fieldsValid = conditionNotice(datafields, regle);
            if (fieldsValid.length > 0) {
                const identifiant = identifiantNotice(fieldsValid, regle);
                if (identifiant.length > 0) {
                    for (let i in identifiant) {
                        getRequest(identifiant[i], regle, resultJson);
                    }
                } else {
                    addError(regle, resultJson);
                }
            }
        });
    }


    return {
        testIdRefRules: testIdRefRules,
        validateIdRef: validateIdRef,
        conditionNotice: conditionNotice,
        identifiantNotice: identifiantNotice,
        validEmptyArray: validEmptyArray,
        addError: addError
    }
}();

export default IdRef;
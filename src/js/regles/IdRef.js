const Parcours = require("../utile/Parcours");
const convert = require("xml-js");
const axios = require('axios');



var IdRef = function () {

    var getRequest = function (identifiant, regle, resultJson) {
        axios.get("https://www.idref.fr/" + identifiant + ".xml")
            .then(function (response) {
                const data = JSON.parse(
                    convert.xml2json(response.data, { compact: true, spaces: 2 })
                );
                validateIdRef(data, regle, resultJson)
            })
            .catch(function (error) {
                //console.log("avant : " , resultJson)
                resultJson.errors.push({
                    message: regle.message + " ( " + regle.index + " ) ",
                    number: regle.number,
                    code: regle.code
                });
                //console.log("apres : " , resultJson)
            })
    }

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
            resultJson.errors.push({
                message: regle.message + " ( " + regle.index + " ) ",
                number: regle.number,
                code: regle.code
            });
            //console.log(resultJson.errors)
        }
    }

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


    function remove(array, value) {
        array = array.filter(function (item) {
            return item !== value
        })
    }
    /**
     * Teste la condition de la regle 
     * @param {*} datafields 
     * @param {*} regle 
     */
    var conditionNotice = function (datafields, regle) {
        let retour = [];
        let valid = false;
        const fields = Parcours.findDataFields(datafields, regle.condition[0].number)
        for (let j in fields) {
            retour.push(fields[j])
            valid = false;
            for (let i in regle.condition) {
                if(regle.condition[i].code != null && regle.condition[i].regex != null){
                    valid = testValueCode(fields[j],regle.condition[i].code,regle.condition[i].regex)
                }
                else if(regle.condition[i].code != null) {
                    valid = Parcours.testCode(fields[j],regle.condition[i].code)
                } else {
                    valid = fields[j] != null
                }
    
                if(!valid) {
                    retour.pop()
                }
            }
        }
        return retour
    }


    function validEmptyArray(datafields, regle){
        const fields = Parcours.findDataFields(datafields, regle.condition[0].number)
        return !fields.length > 0
    }

    function addError(regle,resultJson) {
        resultJson.errors.push({
            message: regle.message + " ( " + regle.index + " ) ",
            number: regle.number,
            code: regle.code
        });
    }


     

    /**
     * Recupere l'idantifiant à utiliser pour requeter le serveur externe
     * @param {*} datafields 
     * @param {*} regle 
     */
    var identifiantNotice = function (fields, regle) {
        let identifiant = [];
        for(let i in fields) {
            if (regle.condition[0].code != null) {
                identifiant.push(Parcours.getIdentifiantValue(fields[i], regle.condition[0].code, regle.identifiant.code))
            } else {
                identifiant.push(Parcours.getSubfieldValue(fields[i], regle.identifiant.code))
            }
        }
        

        return identifiant
    }

    var testIdRefRules = function (categorie, rules, controlfields, datafields, resultJson) {
        //getRequest("https://www.idref.fr/032317956.xml")
        rules[categorie].idRef.forEach(function (regle) {
            if (conditionNotice(datafields, regle)) {
                const identifiant = identifiantNotice(datafields, regle)
                if (identifiant != null) {
                    getRequest(identifiant, regle, resultJson)
                } else {


                    resultJson.errors.push({
                        message: regle.message + " ( " + regle.index + " ) ",
                        number: regle.number,
                        code: regle.code
                    });
                }
            }
        });
    }

    return {
        testIdRefRules: testIdRefRules,
        validateIdRef: validateIdRef,
        conditionNotice: conditionNotice,
        identifiantNotice: identifiantNotice,
        validEmptyArray : validEmptyArray,
        addError : addError
    }
}();

module.exports = IdRef;
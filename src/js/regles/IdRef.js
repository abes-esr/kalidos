const Parcours = require("../utile/Parcours");
const convert = require("xml-js");
const axios = require('axios');



var IdRef = function () {

    var getRequest = function (identifiant,regle,resultJson) {
        axios.get("https://www.idref.fr/"+identifiant+".xml")
        .then(function (response) {
            const data = JSON.parse(
                convert.xml2json(response.data, { compact: true, spaces: 2 })
            );
            validateIdRef(data,regle,resultJson)
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

    var validateIdRef = function (data,regle,resultJson){
        const controlfield = data.record.controlfield;
        const field =  Parcours.findDataField(controlfield, regle.verification.number)
        const regex = RegExp(regle.verification.regex);
        let valid = false
        if(field != null) {
            const value = field._text
            if(RegExp(regex).test(value)) {
                valid = true
            }
        }
        
        if(!valid) {
            //console.log("regle : " , regle.numRuleExcell)
            resultJson.errors.push({
                message: regle.message + " ( " + regle.index + " ) ",
                number: regle.number,
                code: regle.code
            });
            //console.log(resultJson.errors)
        }
    }

    var testValueCode = function(field,code,regex) {
        const subfield = Parcours.getSubfieldValue(field,code)
        const regExp = RegExp(regex);
        if(subfield != null) {
            //console.log(subfield , " " , regex , " ",RegExp(regExp).test(subfield))
            return RegExp(regExp).test(subfield)
        } else {
            return false
        }
    }

    /**
     * Teste la condition de la regle 
     * @param {*} datafields 
     * @param {*} regle 
     */
    var conditionNotice = function(datafields ,regle) {
        let retour = false;
        for (let i in regle.condition) {
            const field = Parcours.findDataField(datafields, regle.condition[i].number)
            if(field != null && regle.condition[i].code != null && regle.condition[i].regex != null){
                retour = testValueCode(field,regle.condition[i].code,regle.condition[i].regex)
            }
            else if(field != null && regle.condition[i].code != null) {
                retour = Parcours.testCode(field,regle.condition[i].code)
            } else {
                retour = field != null
            }
            if(retour == false) {
                return false;
            }
        }
        return retour
    }

    /**
     * Recupere l'idantifiant à utiliser pour requeter le serveur externe
     * @param {*} datafields 
     * @param {*} regle 
     */
    var identifiantNotice = function (datafields ,regle){
        const field = Parcours.findDataField(datafields, regle.identifiant.number)
        const identifiant = Parcours.getSubfieldValue(field,regle.identifiant.code)
        return identifiant
    }

    var testIdRefRules = function (categorie,rules, controlfields, datafields, resultJson) {
        //getRequest("https://www.idref.fr/032317956.xml")
        rules[categorie].idRef.forEach(function (regle) {
            if (conditionNotice(datafields, regle)) {
                const identifiant = identifiantNotice(datafields,regle)
                if(identifiant != null) {
                    getRequest(identifiant,regle , resultJson)
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
        testIdRefRules : testIdRefRules,
        validateIdRef : validateIdRef,
        conditionNotice : conditionNotice,
        identifiantNotice : identifiantNotice,
    }
}();

module.exports = IdRef;
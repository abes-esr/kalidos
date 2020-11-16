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
                message: regle.message,
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
            //console.log (regex , " : " , value , " -> " ,RegExp(regex).test(value))
            if(RegExp(regex).test(value)) {
                valid = true
            }
        }
        
        if(!valid) {
            resultJson.errors.push({
                message: regle.message,
                number: regle.number,
                code: regle.code
            });
            //console.log(resultJson.errors)
        }
    }

    /**
     * Teste la condition de la regle 
     * @param {*} datafields 
     * @param {*} regle 
     */
    var conditionNotice = function(datafields ,regle) {
        const field = Parcours.findDataField(datafields, regle.condition.number)
        if(field != null && regle.condition.code != null) {
            return Parcours.testCode(field,regle.condition.code)
        } else {
            return field != null 
        }
    }

    /**
     * Recupere l'idantifiant à utiliser pour requeter le serveur externe
     * @param {*} datafields 
     * @param {*} regle 
     */
    var identifiantNotice = function (datafields ,regle){
        const field = Parcours.findDataField(datafields, regle.condition.number)
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
                        message: regle.message,
                        number: regle.number,
                        code: regle.code
                    });
                }
            } 
        });
    }

    return {
        testIdRefRules : testIdRefRules
    }
}();

module.exports = IdRef;
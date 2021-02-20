import Parcours from "../utile/Parcours";

var Matching = function () {
    /**
     * Verifie les regles de type Matching
     * @param {String} categorie categorie du document
     * @param {json} rules fichier de regle
     * @param {json} controlfields zone de controle
     * @param {json} datafields zone de données
     * @param {json} resultJson fichier de resultat
     */
    var testMatchRegexRules = function (categorie, rules, controlfields, datafields, resultJson) {
        rules[categorie].matching.forEach(function (regle) {
            if (regle.number instanceof Array) {
                testMatchRegexNumberArray(regle, datafields, resultJson)
            } else {
                testMatchRegexNumber(regle, datafields, controlfields, resultJson)
            }
        });
    }

   /**
    * verrifie le matching d'une regle
    * @param {json} regle regle courrante
    * @param {String} regex regex a matcher
    * @param {json} field zone de données
    * @param {String} text texte a tester
    * @param {String} code code du subfield
    */
    function matchFactoriser(regle, regex, field, text, code) {
        let addError = false;
        if (code === regle.code || regle.number === "GLOBAL") {
            addError = addError || regle.match === "all" && !matchAll(field, regle.value);
            addError = addError || regle.match === "one" && !matchOne(field, regle.value);
            if (text != undefined) {
                const textWithoutLineBreak = text.toString().replace(/\n/g, '');
                const match = textWithoutLineBreak.match(regex);
                addError = addError || !(match && textWithoutLineBreak === match[0]);
            }
        }
        return addError;
    }

    /**
     * ?_?
     * @param {*} regle 
     * @param {*} datafields 
     * @param {*} controlfields 
     * @param {*} resultJson 
     */
    var testMatchRegexNumber = function (regle, datafields, controlfields, resultJson) {
        const regex = RegExp(regle.regex, 'g');
        let addError = false;
        for (let i in datafields) {
            addError = verifyMatchInDatafield(datafields[i], regle, regex);
            if (addError) {
                break;
            }
        }

        if (addError) {
            addErrorInJson(resultJson, regle);
        }

        // Cas où la contrainte est dans le controlfield
        // Les controfields possèdent des tags qui ont la forme 00X 
        // contrairement aux datafields où leur tags sont >= 100 
        const matchControlField = RegExp("^00.*", 'g');
        if (!(regle.number instanceof Array) && RegExp(matchControlField).test(regle.number)) {

            const controlField = Parcours.findDataField(controlfields, regle.number)
            if (controlField != null) {
                const value = controlField._text
                if (!RegExp(regex).test(value)) {
                    addErrorInJson(resultJson, regle);
                }
            }
        }
    }

    /**
     * Verifie qu'une regle est valide dans un datafield
     * @param {json} datafield zone de données
     * @param {json} regle regle courante
     * @param {String} regex regex a matcher
     */
    function verifyMatchInDatafield(datafield, regle, regex) {
        const verificationTag = verifyTag(datafield, regle);
        const verificationIndice = verifyIndice(datafield, regle);

        if (verificationTag && verificationIndice) {
            let subfieldList = datafield.subfield;
            if (!(subfieldList instanceof Array)) {
                subfieldList = [subfieldList];
            }
            const subfieldError = verifyMatchInSubfieldList(subfieldList, regle, regex);
            if (subfieldError) {
                return true;
            }
        }
        return false;
    }

    /**
     * Verifie qu'une regle est valide dans une liste de subfield
     * @param {json} subfieldList liste de subfield
     * @param {json} regle regle courante
     * @param {String} regex regex a matcher
     */
    function verifyMatchInSubfieldList(subfieldList, regle, regex) {
        for (let j in subfieldList) {
            const subfield = subfieldList[j];
            const addError = matchFactoriser(regle, regex, subfield._text, subfield._text, subfield._attributes.code);
            if (addError) {
                return true;
            }
        }
        return false;
    }

    /**
     * verifie si un champ matche avec toutes les regex 
     * @param {String} textField texte a tester
     * @param {List<String>} value liste de regex a matcher
     */
    var matchAll = function (textField, value) {
        for (const j in value) {
            //console.log(value[j] , " : " , field.subfield[i]._text , " -> " , !RegExp(value[j]).test(field.subfield[i]._text))
            if (!RegExp(value[j]).test(textField)) {
                return false
            }
        }
        return true;
    }

    /**
     * verifie si un champ matche avec au moins une regex parmis la liste 
     * @param {String} textField texte a tester
     * @param {List<String>} value liste de regex
     */
    var matchOne = function (textField, value) {
        for (const j in value) {
            if (RegExp(value[j]).test(textField)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Teste une regex sur un datafield, en prenant en compte les possible duplications de celui ci dans le documents
     * @param {String} regle regle courrante
     * @param {json} datafields zone de données
     * @param {json} resultJson fichier de resultat
     */
    var testMatchRegexNumberArray = function (regle, datafields, resultJson) {
        let valid = regle.number.length
        let numberError = []
        const value = regle.value
        const message = regle.message
        for (const item in regle.number) {
            const field = Parcours.findDataField(datafields, regle.number[item])
            numberError.push(regle.number[item])
            let matchvalid = true
            if (field != null) {
                let subfieldList = field.subfield;
                if(!(subfieldList instanceof Array)) {
                    subfieldList = [subfieldList];
                } 
                
                for (let i in subfieldList) {
                    if (subfieldList[i]._attributes.code === regle.code) {
                        if (regle.match === "all") {
                            matchvalid = matchAll(subfieldList[i]._text, value)
                        }
                        else if (regle.match === "one") {
                            matchvalid = matchOne(subfieldList[i]._text, value)
                        }
                        if (matchvalid) {
                            valid -= 1
                            numberError.pop()
                        }

                    }
                }
            } else {
                valid -= 1
                numberError.pop()
            }
            if (field != null && !valid) {
                break;
            }
        }
        if (valid > 0) {
            let errors = "";
            for (const str in numberError) {
                errors += numberError[str];
                if (str < numberError.length - 1) {
                    errors += " , ";
                }
            }
            const tempRegle = {
                message: message,
                number: errors,
                code : regle.code,
                numRuleExcell: regle.numRuleExcell
            }
            addErrorInJson(resultJson, tempRegle);
        }

    }


    return {
        testMatchRegexRules: testMatchRegexRules,
        testMatchRegexNumber: testMatchRegexNumber
    }
}();

export default Matching;

/**
 * Ajoute une erreur au fichier de resultat
 * @param {json} resultJson fichier de resultat
 * @param {json} regle regle courrante
 */
function addErrorInJson(resultJson, regle) {
    resultJson.errors.push({
        message: regle.message,
        number: regle.number,
        code: regle.code,
        numRuleExcell: regle.numRuleExcell
    });
    Parcours.addErrorSynchro();
}

/**
 * verifie le tag de la regle
 * @param {json} field datafield a verifier
 * @param {json} regle regle courrante
 */
function verifyTag(field, regle) {
    const tagIsOk = field._attributes.tag.toString() === regle.number.toString();
    const isGlobal = regle.number === "GLOBAL";
    return tagIsOk || isGlobal;
}

/**
 * verrifie les indices
 * @param {json} field datafield a verifier
 * @param {json} regle regle courrante
 */
function verifyIndice(field, regle) {
    const ind1IsOk = !regle.ind1 || (regle.ind1 && regle.ind1 === field._attributes.ind1.toString().trim());
    const ind2IsOk = !regle.ind2 || (regle.ind2 && regle.ind2 === field._attributes.ind2.toString().trim());
    return ind1IsOk && ind2IsOk;
}

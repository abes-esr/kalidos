const Parcours = require("../utile/Parcours");

var Matching = function () {
    var testMatchRegexRules = function (categorie, rules, controlfields, datafields, resultJson) {
        rules[categorie].matching.forEach(function (regle) {
            if (regle.number instanceof Array) {
                testMatchRegexNumberArray(regle, datafields, resultJson)
            } else {
                testMatchRegexNumber(regle, datafields, controlfields, resultJson)
            }
        });
    }

    // Faudrait trouver un nom plus explicite
    function matchFactoriser(regle, regex, field, text, code) {
        let addError = false;
        if (code === regle.code || regle.number === "GLOBAL") {
            addError = addError || regle.match === "all" && !matchAll(field, regle.value);
            addError = addError || regle.match === "one" && !matchOne(field, regle.value);
            if (text != undefined) {
                const match = text.toString().match(regex);
                // if (regle.number == "700") {
                //     console.log(text, regex, match, match && text === match[0]);
                // }
                addError = addError || !(match && text === match[0]);
            }
        }
        return addError;
    }

    var testMatchRegexNumber = function (regle, datafields, controlfields, resultJson) {
        const regex = RegExp(regle.regex, 'g');
        datafields.forEach(function (field) {
            if (field._attributes.tag.toString() === regle.number.toString() || regle.number === "GLOBAL") {
                if (field.subfield instanceof Array) {
                    field.subfield.forEach(function (subfield) {
                        let addError = matchFactoriser(regle, regex, subfield._text, subfield._text, subfield._attributes.code);
                        if (addError) {
                            resultJson.errors.push({
                                message: regle.message,
                                number: regle.number,
                                code: regle.code,
                            });
                        }
                    });
                } else {
                    let addError = matchFactoriser(regle, regex, field, field.subfield._text, field.subfield._attributes.code);
                    if (addError) {
                        resultJson.errors.push({
                            message: regle.message,
                            number: regle.number,
                            code: regle.code
                        });
                    }
                }
            }
        });
        //Cas ou la contrainte est dans le controlfield
        const matchControlField = RegExp("^00.*", 'g');
        if(!(regle.number instanceof Array) && RegExp(matchControlField).test(regle.number)) {
            
            const field_control = Parcours.findDataField(controlfields, regle.number)
            if(field_control != null) {
                const value = field_control._text
                if(!RegExp(regex).test(value)) {
                    resultJson.errors.push({
                        message: regle.message,
                        number: regle.number,
                        code: regle.code,
                    });
                }
            }
        }
    }

    var matchAll = function (textField, value) {
        for (const j in value) {
            //console.log(value[j] , " : " , field.subfield[i]._text , " -> " , !RegExp(value[j]).test(field.subfield[i]._text))
            if (!RegExp(value[j]).test(textField)) {
                return false
            }
        }
        return true;
    }

    var matchOne = function (textField, value) {
        for (const j in value) {
            if (RegExp(value[j]).test(textField)) {
                return true;
            }
        }
        return false;
    }

    var testMatchRegexNumberArray = function (regle, datafields, resultJson) {
        let valid = regle.number.length
        let numberError = []
        const value = regle.value
        const message = regle.message
        for (const item in regle.number) {
            const field = Parcours.findDataField(datafields, regle.number[item])
            numberError.push(regle.number[item])
            let matchvalid = true
            if (field != null && field.subfield instanceof Array) {
                for (i in field.subfield) {
                    if (field.subfield[i]._attributes.code === regle.code) {
                        if (regle.match === "all") {
                            matchvalid = matchAll(field.subfield[i]._text, value)
                        }
                        else if (regle.match === "one") {
                            matchvalid = matchOne(field.subfield[i]._text, value)
                        }
                        if (matchvalid) {
                            valid -= 1
                            numberError.pop()
                        }

                    }
                }
            } else if (field != null) {
                if (field.subfield._attributes.code === regle.code) {
                    // matchvalid = true;
                    if (regle.match === "all") {
                        matchvalid = matchAll(field.subfield._text, value)
                    }
                    else if (regle.match === "one") {
                        matchvalid = matchOne(field.subfield._text, value)
                    }
                    if (matchvalid) {
                        valid -= 1
                        numberError.pop()
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
            resultJson.errors.push({
                message: message,
                number: errors
            });
        }

    }


    return {
        testMatchRegexRules: testMatchRegexRules,
        testMatchRegexNumber: testMatchRegexNumber
    }
}();

module.exports = Matching;
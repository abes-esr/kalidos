const Parcours = require("./Parcours");

var Matching = function () {
    var testMatchRegexRules = function (rules, controlfields, datafields, resultJson) {
        rules.Generale.matching.forEach(function (regle) {
            if (regle.number instanceof Array) {
                testMatchRegexNumberArray(regle, datafields, resultJson)
            } else {
                testMatchRegexNumber(regle, datafields, resultJson)
            }
        });
    }
    var testMatchRegexNumber = function (regle, datafields, resultJson) {
        const regex = RegExp(regle.regex);
        datafields.forEach(function (field) {
            if (field._attributes.tag.toString() === regle.number.toString() || regle.number === "GLOBAL") {
                if (field.subfield instanceof Array) {
                    field.subfield.forEach(function (subfield) {
                        if (subfield._attributes.code === regle.code || regle.number === "GLOBAL") {
                            if (regle.match === "all" && !matchAll(subfield._text,regle.value)) {
                                resultJson.errors.push({
                                    message: regle.message,
                                    number: regle.number,
                                    code: regle.code
                                });
                            }
                            else if (regle.match === "one" && !matchOne(subfield._text,regle.value)) {
                                resultJson.errors.push({
                                    message: regle.message,
                                    number: regle.number,
                                    code: regle.code
                                });
                            }
                            else if (!regex.test(subfield._text)) {
                                resultJson.errors.push({
                                    message: regle.message,
                                    number: regle.number,
                                    code: regle.code
                                });
                            }
                        }
                    });
                } else {
                    if (field.subfield._attributes.code === regle.code || regle.number === "GLOBAL") {
                        if (regle.match === "all" && !matchAll(field,regle.value)) {
                            resultJson.errors.push({
                                message: regle.message,
                                number: regle.number,
                                code: regle.code
                            });
                        }
                        else if (regle.match === "one" && !matchOne(field,regle.value)) {
                            resultJson.errors.push({
                                message: regle.message,
                                number: regle.number,
                                code: regle.code
                            });
                        }
                        else if (!regex.test(field.subfield._text)) {
                            resultJson.errors.push({
                                message: regle.message,
                                number: regle.number,
                                code: regle.code
                            });
                        }
                    }
                }
            }
        });
    }

    var matchAll = function (textField,value) {
        for (j in value) {
            //console.log(value[j] , " : " , field.subfield[i]._text , " -> " , !RegExp(value[j]).test(field.subfield[i]._text))
            if (!RegExp(value[j]).test(textField)) {
                return false
            }
        }
        return true;
    }

    var matchOne = function (textField,value) {
        for (j in value) {
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
        for (item in regle.number) {
            const field = Parcours.findDataField(datafields, regle.number[item])
            numberError.push(regle.number[item])
            let matchvalid = true
            if (field != null && field.subfield instanceof Array) {
                for (i in field.subfield) {
                    if (field.subfield[i]._attributes.code === regle.code) {
                        if (regle.match === "all") {
                            matchvalid = matchAll(field.subfield[i]._text,value)
                        }
                        else if (regle.match === "one") {
                            matchvalid = matchOne(field.subfield[i]._text,value)
                        }
                        if (matchvalid) {
                            valid -= 1
                            numberError.pop()
                        }

                    }
                }
            } else if (field != null) {
                if (field.subfield._attributes.code === regle.code) {
                    matchvalid = true;
                    if (regle.match === "all") {
                        matchvalid = matchAll(field.subfield._text,value)
                    }
                    else if (regle.match === "one") {
                        matchvalid = matchOne(field.subfield._text,value)
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
            for (str in numberError) {
                errors += numberError[str];
                if(str < numberError.length - 1) {
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
        testMatchRegexRules: testMatchRegexRules
    }
}();

module.exports = Matching;
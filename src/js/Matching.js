var Matching = function () {
    const findDataField = function (datafields,number) {
        let retour = null
        datafields.forEach(function (field) {
            if (field._attributes.tag === number) {
                retour = field
                return field
            }
        });
        return retour;
    }
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
                            if (!regex.test(subfield._text)) {
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
                        if (!regex.test(field.subfield._text)) {
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
    var testMatchRegexNumberArray = function (regle, datafields, resultJson) {
        let valid = regle.number.length
        let numberError = []
        const value = regle.value
        const message = regle.message
        for (item in regle.number) {
            const field = findDataField(datafields, regle.number[item])
            numberError.push(regle.number[item])
            let matchvalid = true
            if (field != null && field.subfield instanceof Array) {
                for (i in field.subfield) {
                    if (field.subfield[i]._attributes.code === regle.code) {
                        if (regle.match === "all") {
                            matchvalid = true;
                            for (j in value) {                            
                                if (!RegExp(value[j]).test(field.subfield[i]._text)) {
                                    matchvalid = false;
                                    break;
                                }
                            }
                        }
                        else if (regle.match === "one") {
                            matchvalid = false
                            for (j in value) {
                                if (RegExp(value[j]).test(field.subfield[i]._text)) {
                                    matchvalid = true;
                                    break;
                                }
                            }
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
                        for (j in value) {
                            if (!RegExp(value[j]).test(field.subfield._text)) {
                                matchvalid = false;
                                break;
                            }
                        }
                    }
                    else if (regle.match === "one") {
                        matchvalid = false
                        for (j in value) {
                            if (RegExp(value[j]).test(field.subfield._text)) {
                                matchvalid = true;
                                break;
                            }
                        }
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
            resultJson.errors.push({
                message: message,
                number: numberError
            });
        }

    }


    return {
        testMatchRegexRules: testMatchRegexRules
    }
}();

module.exports = Matching;
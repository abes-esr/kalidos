var Structurel = function () {

    const findDataField = function (datafields, number) {
        let retour = null
        datafields.forEach(function (field) {
            if (field._attributes.tag === number) {
                retour = field
                return field
            }
        });
        return retour;
    }

    var testMatchStructurelRules = function (rules, controlfields, datafields, resultJson) {
        /*"number": "181",
                "ind1":"",
                "ind2":"",
                "code":"",
                "type":"required",
                "message": "181 obligatoire" 
        */

        rules.Generale.Structurel.forEach(function (regle) {
            const ind1 = regle.ind1
            const ind2 = regle.ind2
            const code = regle.code
            const type = regle.type
            const value = regle.value
            const message = regle.message

            if (regle.number.length == 1) {
                const number = regle.number[0]
                let retour = findDataField(datafields, number)
                // contrainte sur le number
                if (ind1 === "" && ind2 === "" && code === "") {
                    if (regle.type === "required") {
                        if (retour == null) {
                            resultJson.errors.push({
                                message: message,
                                number: number
                            });
                        }
                    } else if (regle.type === "exclude") {
                        if (retour != null) {
                            resultJson.errors.push({
                                message: message,
                                number: number
                            });
                        }
                    }
                }
            } else {
                if (regle.type === "required one") {
                    let foundOne = false;
                    for (item in regle.number) {
                        if (findDataField(datafields, regle.number[item]) != null) {
                            foundOne = true
                            break;
                        }
                    }
                    if (!foundOne) {
                        resultJson.errors.push({
                            message: message,
                            number: number
                        });
                    }
                }
                if (regle.type == "contains code" || regle.type == "neq" ||  regle.type == "eq") {
                    let valid = regle.number.length
                    let numberError = []
                    for (item in regle.number) {
                        const field = findDataField(datafields, regle.number[item])
                        numberError.push(regle.number[item])
                        if (field != null && field.subfield instanceof Array) {
                            for (i in field.subfield) {
                                if (field.subfield[i]._attributes.code === regle.code) {
                                    if (regle.type == "contains code") {
                                        valid -= 1
                                        numberError.pop()
                                        break;
                                    } else if (regle.type == "neq") {
                                        if(!value.includes(field.subfield[i]._text)){
                                            valid -= 1
                                            numberError.pop()
                                        }
                                    }else if (regle.type == "eq") {
                                        if(value.includes(field.subfield[i]._text)){
                                            valid -= 1
                                            numberError.pop()
                                        }
                                    }

                                }
                            }
                        } else if (field != null) {
                            if (field.subfield._attributes.code === regle.code) {
                                if (regle.type == "contains code") {
                                    valid -= 1
                                    numberError.pop()
                                } else if (regle.type == "neq") {
                                    if(!value.includes(field.subfield._text)){
                                        valid -= 1
                                        numberError.pop()
                                    }
                                }else if (regle.type == "eq") {
                                    if(value.includes(field.subfield._text)){
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
                        resultJson.errors.push({
                            message: message,
                            number: numberError
                        });
                    }
                }
            }



        });

    }
    return {
        testMatchStructurelRules: testMatchStructurelRules
    }
}();

module.exports = Structurel;
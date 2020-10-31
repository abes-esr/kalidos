const Parcours = require("./Parcours");

var Structurel = function () {
    function verifyRequire(type, retour) {
        return type === "required" && retour == null;
    }

    function verifyExclude(type, retour) {
        return type === "exclude" && retour != null
    }

    function verifyRequireOne(regle, datafields) {
        if (regle.type === "required one") {
            for (item in regle.number) {
                if (Parcours.findDataField(datafields, regle.number[item]) != null) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    function verifyContainsCode(regle, datafields) {
        if (regle.type == "contains code") {
            let valid = regle.number.length;
            let numberError = [];
            for (item in regle.number) {
                const field = Parcours.findDataField(datafields, regle.number[item])
                numberError.push(regle.number[item]);
                
                if (field != null && field.subfield instanceof Array) {
                    for (i in field.subfield) {
                        if (field.subfield[i]._attributes.code === regle.code) {
                            if (regle.type == "contains code") {
                                valid -= 1;
                                numberError.pop();
                                break;
                            }
                        }
                    }
                } else if (field != null) {
                    if (field.subfield._attributes.code === regle.code) {
                        if (regle.type == "contains code") {
                            valid -= 1;
                            numberError.pop();
                        }
                    }
                } else {
                    valid -= 1;
                    numberError.pop();
                }
                if (field != null && !valid) {
                    break;
                }
            }
            return valid>0;
        }
    }

    var testMatchStructurelRules = function (rules, controlfields, datafields, resultJson) {
        rules.Generale.Structurel.forEach(function (regle) {
            const ind1 = regle.ind1
            const ind2 = regle.ind2
            const code = regle.code
            const type = regle.type
            const value = regle.value
            const message = regle.message
            let number = undefined;

            let isPushInJson = false;

            if (regle.number.length == 1) {
                number = regle.number[0]
                let retour = Parcours.findDataField(datafields, number)
                // contrainte sur le number
                if (ind1 === "" && ind2 === "" && code === "") {
                    isPushInJson = isPushInJson || verifyRequire(type, retour);
                    isPushInJson = isPushInJson || verifyExclude(type, retour);
                }
            } else {
                isPushInJson = isPushInJson || verifyRequireOne(regle, datafields); 
                isPushInJson = isPushInJson || verifyContainsCode(regle, datafields);                 
            }

            if(isPushInJson) {
                resultJson.errors.push({
                    message: message,
                    number: number
                });
            }



        });

    }
    return {
        testMatchStructurelRules: testMatchStructurelRules
    }
}();

module.exports = Structurel;
import Parcours from "../utile/Parcours";

var Structurel = function () {

    /**
     * verifie les regles de sous-type required
     * @param {String} type type de la regle
     * @param {json} retour valeur de retour -> datafield
     */
    function verifyRequire(type, retour) {
        return type === "required" && retour == null;
    }

    /**
     * verifie les regles de sous-type exclude
     * @param {String} type type de la regle
     * @param {json} retour valeur de retour -> datafield
     */
    function verifyExclude(type, retour) {
        return type === "exclude" && retour != null
    }

    /**
     * verifie une regle de sous-type "required one"
     * @param {json} regle regle courrante
     * @param {json} datafields zone de données
     */
    function verifyRequireOne(regle, datafields) {
        if (regle.type === "required one") {
            for (let item in regle.number) {
                if (Parcours.findDataField(datafields, regle.number[item]) != null) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /**
 * verifie une regle de sous-type "contains code"
 * @param {json} regle regle courrante
 * @param {json} datafields zone de données
 */
    function verifyContainsCode(regle, datafields) {
        if (regle.type == "contains code") {
            let valid = regle.number.length;
            // let numberError = [];
            for (let item in regle.number) {
                const field = Parcours.findDataField(datafields, regle.number[item])
                // numberError.push(regle.number[item]);

                if (field != null && field.subfield instanceof Array) {
                    for (let i in field.subfield) {
                        if (field.subfield[i]._attributes.code === regle.code) {
                            if (regle.type == "contains code") {
                                valid -= 1;
                                // numberError.pop();
                                break;
                            }
                        }
                    }
                } else if (field != null) {
                    if (field.subfield._attributes.code === regle.code) {
                        if (regle.type == "contains code") {
                            valid -= 1;
                            // numberError.pop();
                        }
                    }
                } else {
                    valid -= 1;
                    // numberError.pop();
                }
                if (field != null && !valid) {
                    break;
                }
            }
            return valid > 0;
        }
    }

    /**
* verifie une regle de sous-type "index"
* @param {json} regle regle courrante
* @param {json} datafields zone de données
*/
    function verifyIndex(regle, datafields) {
        if (regle.type == "index") {
            for (let item in regle.number) {
                let field = Parcours.findDataField(datafields, regle.number[item])
                if (field != null && (field._attributes.ind1 !== regle.ind1 || field._attributes.ind2 !== regle.ind2)) {
                    return true
                }
            }
            return false

        }
    }


    /**
* verifie une regle de sous-type "required with value"
* @param {json} regle regle courrante
* @param {json} datafields zone de données
*/
    function verifyRequiredValue(regle, datafields) {
        if (regle.type == "required with value") {
            for (let item in regle.number) {
                let field = Parcours.findDataField(datafields, regle.number[item])
                let texte = Parcours.getSubfieldValue(field, regle.code)
                //console.log(texte , " " , regle.value ," -> " ,texte !== regle.value)
                if (texte !== regle.value) {
                    return true
                }
            }
            return false

        }
    }

    /**
* verifie une regle de sous-type "exclude"
* @param {json} regle regle courrante
* @param {json} datafields zone de données
*/
    function verifyExcludeCode(regle, datafields) {
        if (regle.type == "exclude") {
            for (let item in regle.number) {
                const field = Parcours.findDataField(datafields, regle.number[item])
                if (Parcours.testCode(field, regle.code)) {
                    return true
                }
            }
            return false

        }
    }

    /**
 * Verifie les regles de type Structurel
 * @param {String} categorie categorie du document
 * @param {json} rules fichier de regle
 * @param {json} controlfields zone de controle
 * @param {json} datafields zone de données
 * @param {json} resultJson fichier de resultat
 */
    var testMatchStructurelRules = function (categorie, rules, controlfields, datafields, resultJson) {
        rules[categorie].Structurel.forEach(function (regle) {
            const ind1 = regle.ind1
            const ind2 = regle.ind2
            const code = regle.code
            const type = regle.type
            // const value = regle.value
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
                } else if (ind1 != "" && ind2 != "") {
                    isPushInJson = isPushInJson || verifyIndex(regle, datafields);
                } else if (code != "") {
                    isPushInJson = isPushInJson || verifyRequiredValue(regle, datafields);
                    isPushInJson = isPushInJson || verifyExcludeCode(regle, datafields);
                }
            } else {
                isPushInJson = isPushInJson || verifyRequireOne(regle, datafields);
                isPushInJson = isPushInJson || verifyContainsCode(regle, datafields);
            }

            if (isPushInJson) {
                resultJson.errors.push({
                    message: message,
                    number: number
                });
                Parcours.addErrorSynchro();
            }
        });


    }
    return {
        testMatchStructurelRules: testMatchStructurelRules
    }
}();

export default Structurel;
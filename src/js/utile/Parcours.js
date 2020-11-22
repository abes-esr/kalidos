var Parcours = function () {

    /**
     * Retourne un champ de notice
     * @param {*} datafields 
     * @param {*} number 
     */
    const findDataField = function (datafields, number) {
        let retour = null
        datafields.forEach(function (field) {
            if (field._attributes.tag == number) {
                retour = field
                return field
            }
        });
        return retour;
    }

    /**
     * retourne la valeur d'un champ d'une notice
     * @param {*} field 
     * @param {*} code 
     */
    const getSubfieldValue = function(field,code) {
        if (field != null && field.subfield instanceof Array) {
            for (let i in field.subfield) {
                if(field.subfield[i]._attributes.code === code) {
                    return field.subfield[i]._text
                }
            }
        }else if (field != null) {
            if (field.subfield._attributes.code === code) {
                return field.subfield._text

            }
        } 
        return null
    }


    const getIdentifiantValue = function(field,codeCondition,codeIdentifiant) {
        let retour = null;
        if (field != null && field.subfield instanceof Array) {
            for (let i in field.subfield) {
                if(field.subfield[i]._attributes.code === codeIdentifiant) {
                    retour =  field.subfield[i]._text
                }
                if(field.subfield[i]._attributes.code === codeCondition && retour != null) { 
                    return retour
                }
            }
        }else if (field != null) {
            if (field.subfield._attributes.code === codeIdentifiant) {
                return field.subfield._text
            }
        } 
        return null
    }

    const testCode = function(field,code) {
        if (field != null && field.subfield instanceof Array) {
            for (let i in field.subfield) {
                if(field.subfield[i]._attributes.code === code) {
                    return true
                }
            }
        }else if (field != null) {
            if (field.subfield._attributes.code === code) {
                return true

            }
        } 
        return false
    }

    /**
     * retourne la liste des Categories de regles (General ,Electronique , ...)
     * @param {*} regles 
     */
    const getCategories = function (regles) {
        let catagorie = []
        for(item in regles) {
            catagorie.push(item)
        }
        return catagorie
    }

    /**
     * Retourne la liste des types de regles (matching, structurel ,...)
     * @param {*} regles 
     */
    const getTypes = function (regles) {
        let types = []
        for(item in regles) {
            for( regle in regles[item]) {
                types.push(regle)
            }
            break;
        }
        return types
    }



    return {
        findDataField: findDataField,
        getSubfieldValue:getSubfieldValue,
        getCategories : getCategories,
        getTypes : getTypes,
        testCode : testCode,
        getIdentifiantValue : getIdentifiantValue
    }
}();

module.exports = Parcours;
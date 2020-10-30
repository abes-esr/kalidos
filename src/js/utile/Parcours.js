var Parcours = function () {
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

    const getSubfieldValue = function(field,code) {
        if (field != null && field.subfield instanceof Array) {
            for (i in field.subfield) {
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
    return {
        findDataField: findDataField,
        getSubfieldValue:getSubfieldValue
    }
}();

module.exports = Parcours;
var Parcours = function () {
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
    return {
        findDataField: findDataField
    }
}();

module.exports = Parcours;
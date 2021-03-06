import Parcours from "../utile/Parcours";


var Compte = function () {
    /**
     * Teste les règles de type Compte.
     * @param {String} categorie catégorie de la règle à tester
     * @param {json} rules fichier de règles
     * @param {json} controlfields zones de contrôle
     * @param {json} datafields zone de données
     * @param {json} resultJson ficher de résultat
     */
    var testCompteRules = function (categorie, rules, controlfields, datafields, resultJson) {
        rules[categorie].compte.forEach(function (regle) {
            const fields = Parcours.findDataFields(datafields, regle.number);
            const subfields = Parcours.getListSubfieldValue(fields,regle.code);
            if (subfields.length < 2) {
                return;
            }
            const fieldsContrainte = Parcours.findDataFields(datafields, regle.contrainte);
            if (fieldsContrainte.length != subfields.length) {
                addError(regle, resultJson);
            }
        });
    }


    /**
     * Ajoute une erreur au fichier de résultat.
     * @param {json} regle règle courante
     * @param {json} resultJson fichier de résultat
     */
    function addError(regle, resultJson) {
        resultJson.errors.push({
            message: regle.message,
            number: regle.number,
            code: regle.code,
            numRuleExcell: regle.numRuleExcell
        });
        Parcours.addErrorSynchro();
    }


    return {
        testCompteRules: testCompteRules
    }
}();

export default Compte;
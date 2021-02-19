import Parcours from "../utile/Parcours";


var Compte = function () {
    /**
     * teste les regles de type Compte
     * @param {String} categorie categorie de la regle a tester
     * @param {json} rules fichier de regles
     * @param {json} controlfields zones de controle
     * @param {json} datafields zone de données
     * @param {json} resultJson ficher de resultat
     */
    var testCompteRules = function (categorie, rules, controlfields, datafields, resultJson) {
        rules[categorie].compte.forEach(function (regle) {
            const fields = Parcours.findDataFields(datafields, regle.number);
            const subfields = Parcours.getListSubfieldValue(fields,regle.code);
            if(subfields.length < 2) {
                return;
            }
            const fieldsContrainte = Parcours.findDataFields(datafields, regle.contrainte);
            if(fieldsContrainte.length != subfields.length) {
                addError(regle, resultJson);
            }
           
        });
    }


    /**
     * Ajoute une erreur au fichier de resultat
     * @param {json} regle regle courrante
     * @param {json} resultJson fichier de resultat
     */
    function addError(regle, resultJson) {
        resultJson.errors.push({
            message: regle.message,
            number: regle.number,
            code: regle.code
        });
        Parcours.addErrorSynchro();
    }


    return {
        testCompteRules: testCompteRules
    }
}();

export default Compte;
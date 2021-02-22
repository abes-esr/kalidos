/**
 * Functions pour la creation des schemas (react-json-schema), et la formalisation des donnees 
 * pour les regles de type : 
 * --------------------------------------    COMPTE    ---------------------------------------
 */

/**
 * Function pour donner le format appropie aux donnes soumis par l'utilisateur
 * @param {*} data
 */
export function formatRuleCompte(data) {
    console.log('formatRuleCompte');
    console.log(data)
    const obj = {};
    obj.number = data.number;
    obj.code = data.code;
    obj.contrainte = data.contrainte;
    obj.message = data.message;
    console.log(obj);
        obj.numRuleExcell = data.numRuleExcell
return obj;
}

/**
 * Fonction pour la creation du schema
 * 
 * @param {
 *      fields : liste de categories dans le fichier json
 *      tags : liste de tags a afficher
 * } categories Liste de categories 
 * @param {
 *      rules : liste de regles sur des motifs, pour le generateur (generator.js)
 *      names : liste de tags a afficher pour chaque regle
 * } rules 
 */
export function getSchemaCompte(categories, rules) {
    return {
        type: "object",
        properties: {
            category: {
                title: 'Type de document',
                type: 'string',
                enum: categories.fields, 
                enumNames: categories.tags
            },
            numRuleExcell: {
                title: "Identifiant Excel",
                type: "number",
            },
            number: {
                title: 'Zone',
                type: 'string',
            },
            code: {
                title: 'Sous Zone',
                type: 'string',
                default: ""
            },
            contrainte: {
                title: 'Numéro de zone qui servira de comparateur',
                type: 'string',
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category','numRuleExcell', 'number', 'contrainte', 'message'],

    }
}

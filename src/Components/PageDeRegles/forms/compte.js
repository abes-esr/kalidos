/**
 * Functions pour la création des schemas (react-json-schema), et la formalisation des données 
 * pour les règles de type : 
 * --------------------------------------    COMPTE    ---------------------------------------
 */

/**
 * Function pour donner le format approprié aux données soumises par l'utilisateur.
 * @param {*} data
 */
export function formatRuleCompte(data) {
    console.log('formatRuleCompte');
    console.log(data);
    const obj = {};
    obj.number = data.number;
    obj.code = data.code;
    obj.contrainte = data.contrainte;
    obj.message = data.message;
    console.log(obj);
    obj.numRuleExcell = data.numRuleExcell;
    return obj;
}

/**
 * Fonction pour la création du schema.
 * 
 * @param {
 *      fields : liste de catégories dans le fichier json
 *      tags : liste de tags à afficher
 * } categories Liste de catégories 
 * @param {
 *      rules : liste de règles sur des motifs, pour le générateur (generator.js)
 *      names : liste de tags à afficher pour chaque règle
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
        required: ['category', 'number', 'contrainte', 'message'],

    }
}

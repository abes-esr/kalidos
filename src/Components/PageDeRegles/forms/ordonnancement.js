/**
 * Functions pour la création des schemas (react-json-schema), et la formalisation des données. 
 * pour les règles de type : 
 * ______________________________________    ORDONNANCEMENT    ______________________________________ 
 */

/**
 * Function pour donner le format approprié aux données soumises par l'utilisateur.
 * @param {*} data
 */
export function formatRuleOrdonnancement(data) {
    //console.log('formatRuleOrdonnancement');
    const obj = {};
    obj.number = data.number;
    obj.orderBy = data.orderBy;
    obj.message = data.message;
    console.log(obj);
    obj.numRuleExcell = data.numRuleExcell
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
export function getSchemaOrdonnancement(categories, rules) {
    return {
        type: "object",
        properties: {
            category: {
                title: 'Type de document',
                type: 'string',
                enum: categories.fields, enumNames: categories.tags
            },
            numRuleExcell: {
                title: "Identifiant Excel",
                type: "number",
            },
            number: {
                title: 'Zone',
                type: 'string',
            },
            orderBy: {
                title: 'Indice sur lequel appliquer le tri',
                type: 'string',
                enum: ['ind1', 'ind2'],
                enumNames: ['Indice 1', 'Indice 2']
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category', 'number', 'orderBy', 'message'],
    }
}

/**
 * Functions pour la creation des schemas (react-json-schema), et la formalisation des donnees 
 * pour les regles de type : 
 * ______________________________________    ORDONNANCEMENT    ______________________________________ 
 */

/**
 * Function pour donner le format appropie aux donnes soumis par l'utilisateur
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

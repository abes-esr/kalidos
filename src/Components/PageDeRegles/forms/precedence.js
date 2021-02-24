import { conditions } from './conditions';

/**
 * Functions pour la création des schemas (react-json-schema), et la formalisation des données. 
 * pour les règles de type : 
 * ______________________________________    PRECEDENCE    ______________________________________ 
 */

/**
 * Function pour donner le format approprié aux données soumises par l'utilisateur.
 * @param {*} data
 */
export function formatRulePrecedence(data) {
    //console.log('formatRulePrecedence');
    const obj = {};
    obj.number = data.number;
    obj.precede = data.precede;
    obj.condition = data.condition;
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
export function getSchemaPrecedence(categories, rules) {
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
                title: "Zone",
                type: "string",
            },
            condition: conditions,
            precede: {
                title:"Precede",            
                type: "object",
                properties: {
                    depart: {
                        title: "Sous zone de départ",
                        type: "string",
                    },
                    precedant: {
                        title: 'Sous zone precedante',
                        type: 'string',
                    },
                },
                required: ['depart', 'precedant'],
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category', 'number', 'condition', 'precede', 'message'],
    }
}

import { conditions } from './conditions';

/**
 * Functions pour la creation des schemas (react-json-schema), et la formalisation des donnees 
 * pour les regles de type : 
 * ______________________________________    PRECEDENCE    ______________________________________ 
 */

/**
 * Function pour donner le format appropie aux donnes soumis par l'utilisateur
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
        required: ['category', 'numRuleExcell', 'number', 'condition', 'precede', 'message'],
    }
}

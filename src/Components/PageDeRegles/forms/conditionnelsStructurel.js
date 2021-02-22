import { conditions } from "./conditions";

/**
 * Functions pour la creation des schemas (react-json-schema), et la formalisation des donnees 
 * pour les regles de type : 
 * ______________________________________    CONDITIONNELS    ______________________________________ 
 *                                            STRUCTUREL
 */

/**
 * Function pour donner le format appropie aux donnes soumis par l'utilisateur
 * @param {*} data
 */
export function formatRuleConditionnelsStructurel(data) {
    console.log('formatRuleConditionnelsStructurel');
    const obj = {};
    obj.number = data.number;
    obj.condition = data.condition;
    obj.value = data.values;
    obj.type = data.type;
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
export function getSchemaConditionnelsStructurel(categories, rules) {
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
            condition: conditions,
            number: {
                title: "Zone",
                type: "string",
            },
            values: {
                title: "Valeurs", 
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        number: {
                            title: "Zone",
                            type: "string",
                        },
                        code: {
                            title: 'Sous Zone',
                            type: 'string',
                            default: ""
                        },
                        ind1: {
                            title: "Indice 1 du datafield",
                            type: "string",
                            default: ""
                        },
                        ind2: {
                            title: "Indice 2 du datafield",
                            type: "string",
                            default: ""
                        },
                        reciproque:{
                            title: 'La règle est réciproque ou non',
                            type: "object",
                            properties: {
                                number: {
                                    title: "Zone",
                                    type: "string",
                                },
                                code: {
                                    title: 'Sous Zone',
                                    type: 'string',
                                    default: ""
                                }
                            },
                            default: ""
                        },
                        present: {
                            title: 'Le champ doit être présent ?',
                            type: "boolean",
                        } 
                    }
                }
            },
            type:{
                title: "Type",
                enum: ["allRequired", "oneRequired"],
                enumNames: ["Tous obligatoires", "Une obligatoire"]
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },

        },
        required: ['category', 'numRuleExcell', 'number', 'condition','type', 'values', 'message'],
    }
}

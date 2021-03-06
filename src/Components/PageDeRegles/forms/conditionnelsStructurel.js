import { conditions } from "./conditions";

/**
 * Functions pour la création des schemas (react-json-schema), et la formalisation des données. 
 * pour les règles de type : 
 * ______________________________________    CONDITIONNELS    ______________________________________ 
 *                                            STRUCTUREL
 */

/**
 * Function pour donner le format approprié aux données soumises par l'utilisateur.
 * @param {*} data
 */
export function formatRuleConditionnelsStructurel(data) {
    console.log('formatRuleConditionnelsStructurel');
    const obj = {};
    obj.number = data.number;
    obj.condition = data.condition;
    obj.value = data.values.map(value => {
        let o = {}
        o.number = value.number;
        o.code = value.code;
        o.ind1 = value.ind1;
        o.ind2 = value.ind2;
        o.present = value.present;
        o.reciproque = isReciproque ? 
            {
                number: reciproque.number,
                code: reciproque.code
            }
        : "";
        return o
    });
    obj.type = data.type;
    obj.message = data.message;
    obj.numRuleExcell = data.numRuleExcell
    console.log(obj);
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
                        isReciproque: {
                            title: "La règle est réciproque ?",
                            type: "boolean",
                            default: false
                        },
                        present: {
                            title: 'Le champ doit être présent ?',
                            type: "boolean",
                        } 
                    },
                    dependencies: {
                        isReciproque:{
                            oneOf:[
                                {
                                    properties:{
                                        isReciproque:{ enum: [true]},
                                        reciproque:{
                                            type: "object",
                                            title: "Réciprocité",
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
                
                                    }
                                },
                                {
                                    properties:{
                                        isReciproque:{ enum: [false]},
                                    }
                                }
                            ]
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
        required: ['category', 'number', 'condition','type', 'values', 'message'],
    }
}

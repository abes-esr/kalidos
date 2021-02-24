import { generator } from "../generator";
import { conditions } from "./conditions";
import { regexCreator } from "./regex";

/**
 * Functions pour la création des schemas (react-json-schema), et la formalisation des données. 
 * pour les règles de type : 
 * ______________________________________    CONDITIONNELS    ______________________________________ 
 *                                              MATCHING
 */

/**
 * Function pour donner le format approprié aux données soumises par l'utilisateur.
 * @param {*} data
 */
export function formatRuleConditionnelsMatching(data) {
    console.log('formatRuleConditionnelsMatching');
    const obj = {};
    obj.number = data.number;
    obj.condition = data.condition;
    obj.values = data.values.map(val => {
        let value = {}
        value.number = val.number
        value.code = val.code
        value.regex = generator(val.regex.rule, val.regex.patterns, val.regex.isWord)
        value.subFieldRequired = val.subFieldRequired? val.subFieldRequired : false
        value.message = val.message
        return value
    });
    
    obj.type = data.type;
    obj.message = data.message;
    console.log(obj);
    obj.numRuleExcell = data.numRuleExcell
    return obj;
}

/**
 * Fonction pour la création du schema
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
export function getSchemaConditionnelsMatching(categories, rules) {
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
                title:"Règles de types Matching à évaluer",
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
                        regex: regexCreator(rules),
                        subFieldRequired: {
                            title: "Le subfield doit être présent ?",
                            type: "boolean"
                        },
                        message: {
                            title: 'Message à afficher',
                            type: 'string',
                        },
                          
                    },
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

import { generator } from "../generator";
import { conditions } from "./conditions";
import { regexCreator } from "./regex";

/**
 * Functions pour la creation des schemas (react-json-schema), et la formalisation des donnees 
 * pour les regles de type : 
 * ______________________________________    CONDITIONNELS    ______________________________________ 
 *                                              MATCHING
 */

/**
 * Function pour donner le format appropie aux donnes soumis par l'utilisateur
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

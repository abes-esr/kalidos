import { mathOperators } from "../operators";
import { conditions } from "./conditions";

/**
 * Functions pour la creation des schemas (react-json-schema), et la formalisation des donnees 
 * pour les regles de type : 
 * ______________________________________    CONDITIONNELS    ______________________________________ 
 *                                            DEPENDANCE
 */

/**
 * Function pour donner le format appropie aux donnes soumis par l'utilisateur
 * @param {*} data
 */
export function formatRuleConditionnelsDependance(data) {
    console.log('formatRuleConditionnelsDependance');
    const obj = {};
    obj.condition = data.condition;
    obj.message = data.message;
    obj.field1 = data.field1;    
    obj.field2 = data.field2;
    obj.operator = data.operator;
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
export function getSchemaConditionnelsDependance(categories, rules) {
    return {
        definitions: {
            champs: {
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
                required: ['number']
            }
        },
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
            field1: {title:"Premier champ","$ref": "#/definitions/champs"},
            field2: {title:"Deuxième champ","$ref": "#/definitions/champs"},
            operator: {
                title: "Opérateur à appliquer",
                type: "string",
                enum: mathOperators.rules,
                enumNames: mathOperators.names
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category','numRuleExcell','field1', 'field2', 'operator', 'condition'],
    }
}

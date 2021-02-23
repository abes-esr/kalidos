import { mathOperators } from '../operators';

/**
 * Functions pour la creation des schemas (react-json-schema), et la formalisation des donnees 
 * pour les regles de type : 
 * ______________________________________    DEPENDENCE    ______________________________________ 
 */

/**
 * Function pour donner le format appropie aux donnes soumis par l'utilisateur
 * @param {*} data
 */
export function formatRuleDependencies(data) {
    //console.log('formatRuleDependencies');
    const obj = {};
    obj.operator = data.operator;
    obj.message = data.message;
    obj.field1 = data.field1;
    obj.field2 = data.field2;
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
export function getSchemaDependencies(categories, rules) {
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
                    },
                    pos: {
                        title: "Position",
                        type: "array",
                        maxItems: 2,
                        items:{
                            title: " Position dans le XML",
                            type: "number"
                        },
                        default: []
                    },
                },
                required: ['number'],

            },
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
            field1: {title:"Premier datafield","$ref": "#/definitions/champs"},
            field2: {title:"Deuxième datafield","$ref": "#/definitions/champs"},
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
        required: ['category', 'operator', 'field1', 'field2', 'message'],

    }
}

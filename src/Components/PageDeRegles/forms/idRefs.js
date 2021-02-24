import { generator } from '../generator';
import { regexCreator } from './regex';

/**
 * Functions pour la création des schemas (react-json-schema), et la formalisation des données. 
 * pour les règles de type : 
 * ______________________________________    IDREF    ______________________________________ 
 */

/**
 * Function pour donner le format approprié aux données soumises par l'utilisateur.
 * @param {*} data
 */
export function formatRuleIdRef(data) {
    console.log('formatRuleIdRef');
    const obj = {};
    obj.message = data.message;
    obj.condition = data.condition.map(cond => {
        return (cond.matching) ? 
            {
                number: cond.number,
                code: cond.code,
                regex: generator(cond.regex.rule, cond.regex.patterns, cond.regex.isWord),
            }
        :
             {
                number: cond.number,
                code: cond.code,
            }
    })
    obj.identifiant = {
        number: data.identifiant.number,
        code: data.identifiant.code,
    }
    obj.verification = {
        number: data.verification.number,
        regex: generator(data.verification.regex.rule, data.verification.regex.patterns, data.verification.regex.isWord),
    }
    console.log(obj);
    obj.numRuleExcell = data.numRuleExcell;
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
export function getSchemaIdRef(categories, rules) {
    return {
        definitions: {
            identifiant: {
                type: "object",
                properties: {
                    number: {
                        title: "La zone où recuperer l'identifiant de la notice externe",
                        type: "string",
                    },
                    code: {
                        title: "La sous zone où recuperer l'identifiant de la notice externe",
                        type: "string",
                        default: ""
                    },
                },
                required: ['number'],
            },
            verification: {
                type: "object",
                properties:{
                    number: {
                        title: "Champ à vérifier dans la notice externe",
                        type: "string",
                    },
                    regex: regexCreator(rules)
                },
                required: ['number', 'regex'],
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
            condition: {
                title:"Condition",
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        number: {
                            title: "Zone",
                            type: "string",
                        },
                        code: {
                            title: "Sous zone",
                            type: "string",
                            default: ""
                        },
                        matching:{
                            title: "Condition de matching ?",
                            type: "boolean",
                            default: false
                        }
                    },
                    required: ['number'],
                    dependencies: {
                        matching: {
                            oneOf: [
                                {
                                    properties: {
                                        matching: { enum: [true] },
                                        regex: regexCreator(rules)
                                    },
                                    required: ['regex']
                                },
                                {
                                    properties: {
                                        matching: { enum: [false] }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            identifiant: {title:"Identifiant","$ref": "#/definitions/identifiant"},
            verification: {title:"Vérification","$ref": "#/definitions/verification"},
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category' ,'identifiant', 'verification', 'condition', 'message'],
    }
}

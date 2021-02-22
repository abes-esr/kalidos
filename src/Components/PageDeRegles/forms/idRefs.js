import { generator } from '../generator';
import { regexCreator } from './regex';

/**
 * Functions pour la creation des schemas (react-json-schema), et la formalisation des donnees 
 * pour les regles de type : 
 * ______________________________________    IDREF    ______________________________________ 
 */

/**
 * Function pour donner le format appropie aux donnes soumis par l'utilisateur
 * @param {*} data
 */
export function formatRuleIdRef(data) {
    console.log('formatRuleIdRef');
    const obj = {};
    obj.message = data.message;
    obj.condition = data.condition.map(cond => {
        return (cond.matching === 'Oui') ? 
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
                            title: "Condition de matching?",
                            enum: ['Oui', 'Non']
                        }
                    },
                    required: ['number'],
                    dependencies: {
                        matching: {
                            oneOf: [
                                {
                                    properties: {
                                        matching: { enum: ['Oui'] },
                                        regex: regexCreator(rules)
                                    },
                                    required: ['regex']
                                },
                                {
                                    properties: {
                                        matching: { enum: ['Non'] }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            verification: {title:"Vérification","$ref": "#/definitions/verification"},
            identifiant: {title:"Identifiant","$ref": "#/definitions/identifiant"},
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category', 'numRuleExcell' ,'identifiant', 'verification', 'condition', 'message'],
    }
}

import { generator } from '../generator';

export function formatRuleIdRef(data) {
  console.log('formatRuleIdRef');
  const obj = {};
  obj.message = data.message;
  obj.condition = {
    number: data.condition.number,
    code: data.condition.code,
  }
  obj.identifiant = {
    code: data.identifiant.code,
  }
  obj.verification = {
    number: data.verification.number,
    regex: generator(data.verification.rule, data.verification.patterns, data.verification.isWord),
  }
  return obj;
}

export function getSchemaIdRef(categories, rules) {
    return {
        definitions: {
            condition: {
                type: "object",
                properties: {
                    number: {
                        title: "Zone",
                        type: "string",
                    },
                    code: {
                        title: "Sous zone",
                        type: "string",
                    },
                },
            },
            identifiant: {
                type: "object",
                properties: {
                    code: {
                        title: "Sous zone",
                        type: "string",
                    },
                }
            },
            verification: {
                type: "object",
                properties:{
                    number: {
                        title: "Zone",
                        type: "string",
                    },
                    rule: {
                        title: 'Regle a utiliser',
                        type: 'string',
                        enum: rules.rules,
                        enumNames: rules.names,
                    },
                    isWord: {
                        title: ' Le motif contiens de mots',
                        type: 'boolean',
                        enum: [true, false],
                        enumNames: ["Oui", "Non"]
                    },
                    patterns: {
                        title: 'Motif(s) a utiliser par la regle',
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                }
            }
        },
        type: "object",
        properties: {
            condition: {title:"Condition","$ref": "#/definitions/condition"},
            identifiant: {title:"Identifiant","$ref": "#/definitions/identifiant"},
            verification: {title:"Vérification","$ref": "#/definitions/verification"},
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
    }
}

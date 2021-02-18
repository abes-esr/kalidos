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
    number: data.identifiant.number,
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
            identifiant: {
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
                required: ['number', 'code'],
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
                },
                required: ['number', 'rule', 'isWord', 'patterns'],
            }
        },
        type: "object",
        properties: {
            category: {
                title: 'Type de document',
                type: 'string',
                enum: categories,
            },
            identifiant: {title:"Identifiant","$ref": "#/definitions/identifiant"},
            verification: {title:"Vérification","$ref": "#/definitions/verification"},
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
                        },
                    },
                    required: ['number', 'code'],
                }
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category','identifiant', 'verification', 'condition', 'message'],
    }
}

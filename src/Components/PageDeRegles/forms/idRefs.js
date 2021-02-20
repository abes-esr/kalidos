import { generator } from '../generator';

export function formatRuleIdRef(data) {
  //console.log('formatRuleIdRef');
  const obj = {};
  obj.message = data.message;
  obj.condition = data.condition.map(cond => {
    if (cond.matching === 'Oui')
        return {
            number: cond.number,
            code: cond.code,
            regex: generator(cond.matching.rule, cond.matching.patterns, cond.matching.isWord),
        }
    else
        return {
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
    regex: generator(data.verification.rule, data.verification.patterns, data.verification.isWord),
  }
  console.log(obj);
return obj;
}

export function getSchemaIdRef(categories, rules) {
    return {
        definitions: {
            identifiant: {
                type: "object",
                properties: {
                    number: {
                        title: "Datafield où recuperer l'identifiant de la notice externe",
                        type: "string",
                    },
                    code: {
                        title: "Subfield où recuperer l'identifiant de la notice externe",
                        type: "string",
                    },
                },
                required: ['number', 'code'],
            },
            verification: {
                type: "object",
                properties:{
                    number: {
                        title: "Champ à vérifier dans la notice externe",
                        type: "string",
                    },
                    rule: {
                        title: 'Regle a utiliser',
                        type: 'string',
                        enum: rules.rules,
                        enumNames: rules.names,
                    },
                    isWord: {
                        title: ' Le motif contient de mots',
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
            numRuleExcell: {
                title: "Nombre de ligne sur Excel",
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
                        },
                        matching:{
                            title: "Condition de matching?",
                            enum: ['Oui', 'Non']
                        }
                    },
                    required: ['number', 'code'],
                    dependencies: {
                        matching: {
                            oneOf: [
                                {
                                    properties: {
                                        matching: { enum: ['Oui'] },
                                        rule: {
                                            title: 'Règle à utiliser',
                                            type: 'string',
                                            enum: rules.rules,
                                            enumNames: rules.names,
                                        },
                                        isWord: {
                                            title: 'Le motif contient de mots',
                                            enum: [true, false],
                                            enumNames: ["Oui", "Non"]
                                        },
                                        patterns: {
                                            title: "Motifs",
                                            type: 'array',
                                            items: {
                                              type: 'string',
                                            },
                                        },
                                    },
                                    required: ['rule','patterns', 'isWord']
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
            identifiant: {title:"Identifiant","$ref": "#/definitions/identifiant"},
            verification: {title:"Vérification","$ref": "#/definitions/verification"},
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category', 'numRuleExcell' ,'identifiant', 'verification', 'condition', 'message'],
    }
}

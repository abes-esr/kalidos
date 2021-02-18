import operators from '../operators'

export function formatRulePrecedence(data) {
    console.log('formatRulePrecedence');
    const obj = {};
    obj.number = data.number;
    obj.message = data.message;
    obj.condition = data.condition;
    obj.precede = data.precede;
    return obj;
}


export function getSchemaPrecedence(categories, rules) {
    return {
        definitions: {
            precede: {
                type: "object",
                properties: {
                    depart: {
                        title: "Sous zone de départ",
                        type: "string",
                    },
                    precedant: {
                        title: 'Sous zone precedante',
                        type: 'string',
                    },
                },
                required: ['depart', 'precedant'],
            }
        },
        type: "object",
        properties: {
            category: {
                title: 'Type de document',
                type: 'string',
                enum: categories,
            },
            number: {
                title: "Zone",
                type: "number",
            },
            condition: {
                title:"Conditions",
                type: 'array',
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
                        },
                        string: {
                            title: 'Mot(s) à utiliser',
                            type: 'array',
                            items: {
                                type: "string"
                            }
                        },
                        operator: {
                            title: "Operateur",
                            type: "string",
                            enum: operators.rules,
                            enumNames: operators.names
                        },
                    },
                    required: ['number', 'orderBy', 'operator'],
                }
            },
            precede: {title:"Precede","$ref": "#/definitions/precede"},
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category', 'number', 'condition', 'precede', 'message'],
    }
}

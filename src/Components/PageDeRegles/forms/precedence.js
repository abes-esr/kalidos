export function formatRulePrecedence(data) {
    console.log('formatRulePrecedence');
    const obj = {};
    obj.number = data.number;
    obj.orderBy = data.orderBy;
    obj.message = data.message;
    return obj;
}


export function getSchemaPrecedence(categories, rules) {
    return {
        definitions: {
            precede: {
                type: "object",
                properties: {
                    depart: {
                        title: "Depart",
                        type: "string",
                    },
                    precedant: {
                        title: 'Precedant',
                        type: 'string',
                    },
                },
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
                title:"Condition",
                type: 'array',
                items: {
                    type: "object",
                    properties: {
                        number: {
                            title: "Zone",
                            type: "number",
                        },
                        code: {
                            title: 'Sous Zone',
                            type: 'string',
                        },
                        string: {
                            title: 'String',
                            type: 'array',
                            items: {
                                type: "string"
                            }
                        },
                        operator: {
                            title: "Operateur de matching",
                            type: "string",
                            enum: ["presente", "contains_text", "startwith_text", "not_startwith_text", "not_contains_text", "not_equals_text"],
                        },
                    },
                }
            },
            precede: {title:"Precede","$ref": "#/definitions/precede"},
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
    }
}

export function formatRuleConditionnelsStructurel(data) {
    console.log('formatRuleConditionnelsStructurel');
    const obj = {};
    obj.number = data.number;
    obj.condition = data.condition;
    obj.value = data.value;
    obj.type = data.type;
    obj.message = data.message;
    return obj;
}

export function getSchemaConditionnelsStructurel(categories, rules) {
    return {
        definitions: {
            champs: {
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
                    ind1: {
                        title: "Indice 1",
                        type: "string"
                    },
                    ind2: {
                        title: "Indice 2",
                    },
                    pos: {
                        title: "Position",
                        type: "object",
                        properties: {
                            x: {title: "x", type: "number"},
                            y: {title: "y", type: "number"},
                        }
                    },
                    string: {
                        title: "String",
                        type: "array",
                        items: {
                            type: "string",
                        }
                    },
                    operator: {
                        title: "Operateur de matching",
                        type: "string",
                        enum: ["presente", "contains_text", "startwith_text", "not_startwith_text", "not_contains_text", "not_equals_text"],
                    },
                },
            },
        },
        type: "object",
        properties: {
            category: {
                title: 'Type de document',
                type: 'string',
                enum: categories,
            },
            condition: {title:"Condition","$ref": "#/definitions/champs"},
            value: {
                type: "array",
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
                        present: {
                            title: 'Le valeur est present?',
                            type: "boolean",
                            enum: [true, false],
                            enumNames: ["Oui", "Non"]
                        } 
                    }
                }
            },
            number: {
                title: "Zone",
                type: "number",
            },
            type:{
                title: "Type",
                enum: ["required", "require with value", "exclude"],
                enumNames: ["Obligatoire", "Obligatoire avec valeur", "Exclure"]
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
    }
}

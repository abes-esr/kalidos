export function formatRuleConditionnelsMatching(data) {
    console.log('formatRuleConditionnelsMatching');
    const obj = {};
    obj.number = data.number;
    obj.condition = data.condition;
    obj.values = data.values;
    obj.type = data.type;
    obj.message = data.message;
    return obj;
}

export function getSchemaConditionnelsMatching(categories, rules) {
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
                    operator: {
                        title: "Operateur de matching",
                        type: "string",
                        enum: ["presente", "contains_text", "startwith_text", "not_startwith_text", "not_contains_text", "not_equals_text"],
                    },
                },
            },
            values: {
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
                    message: {
                        title: "Message",
                        type: 'string',
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
            condition: {title:"Condition","$ref": "#/definitions/champs"},
            type:{
                title: "Type",
                enum: ["required", "require with value", "exclude"],
                enumNames: ["Obligatoire", "Obligatoire avec valeur", "Exclure"]
            },
            values: {title:"Valeurs","$ref": "#/definitions/values"},
            number: {
                title: "Zone",
                type: "number",
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
    }
}

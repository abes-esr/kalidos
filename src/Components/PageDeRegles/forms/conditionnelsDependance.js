export function formatRuleConditionnelsDependance(data) {
    //console.log('formatRuleConditionnelsDependance');
    const obj = {};
    obj.condition = data.condition;
    obj.message = data.message;
    obj.field1 = data.field1;    
    obj.field2 = data.field2;
    obj.operator = data.operator;
    return obj;
}


export function getSchemaConditionnelsDependance(categories, rules) {
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
                    }
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
            condition: {
                title:"Conditions",
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
                        ind1: {
                            title: "Indice 1",
                            type: "string"
                        },
                        ind2: {
                            title: "Indice 2",
                            type: "string"
                        },
                        operator: {
                            title: "Operateur de matching",
                            type: "string",
                            enum: ["presente", "contains_text", "not_contains_text", "startwith_text", "not_startwith_text","not_equals_text", "equals_text"],
                            enumNames: ["Valeur presente", "Doit contenir","Ne doit pas contenir", "Commence par", "Ne doit pas commencer par", "Ne soit pas égale à", "Égale à"]
                        },
                    },
                    required: ['number', 'code', 'ind1', 'ind2', 'operator'],
                }
            },
            field1: {title:"Premier champ","$ref": "#/definitions/champs"},
            field2: {title:"Deuxiéme champ","$ref": "#/definitions/champs"},
            operator: {
                title: "Operateur",
                type: "string",
                enum: ["presente", "contains_text", "not_contains_text", "startwith_text", "not_startwith_text","not_equals_text", "equals_text"],
                enumNames: ["Valeur presente", "Doit contenir","Ne doit pas contenir", "Commence par", "Ne doit pas commencer par", "Ne soit pas égale à", "Égale à"]
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category', 'field1', 'field2', 'operator', 'condition'],
    }
}

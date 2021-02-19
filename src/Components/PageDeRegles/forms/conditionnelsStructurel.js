export function formatRuleConditionnelsStructurel(data) {
    //console.log('formatRuleConditionnelsStructurel');
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
                        operator: {
                            title: "Operateur",
                            type: "string",
                            enum: ["presente", "contains_text", "not_contains_text", "startwith_text", "not_startwith_text","not_equals_text", "equals_text"],
                            enumNames: ["Valeur Presente", "Doit contenir","Ne doit pas contenir", "Commence par", "Ne doit pas commencer par", "Ne soit pas égale à", "Égale à"],
                        },
                    },
                    required: ['number', 'code', 'operator'],
                }
            },
            value: {
                title: "Valeurs", 
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
                enum: ["allRequired", "oneRequired"],
                enumNames: ["Tous obligatoires", "Une obligatoire"]
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },

        },
        required: ['category', 'number', 'condition','type', 'values', 'message'],
    }
}

import { conditions } from "./conditions";

export function formatRuleConditionnelsStructurel(data) {
    console.log('formatRuleConditionnelsStructurel');
    const obj = {};
    obj.number = data.number;
    obj.condition = data.condition;
    obj.value = data.values;
    obj.type = data.type;
    obj.message = data.message;
    console.log(obj);
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
            condition: conditions,
            number: {
                title: "Zone",
                type: "string",
            },
            values: {
                title: "Valeurs", 
                type: "array",
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
                        ind1: {
                            title: "Indice 1 du datafield",
                            type: "string",
                            default: ""
                        },
                        ind2: {
                            title: "Indice 2 du datafield",
                            type: "string",
                            default: ""
                        },
                        reciproque:{
                            title: 'La règle est réciproque ou non',
                            type: "object",
                            properties: {
                                number: {
                                    title: "Zone",
                                    type: "string",
                                },
                                code: {
                                    title: 'Sous Zone',
                                    type: 'string',
                                }
                            },
                        },
                        present: {
                            title: 'Le champ doit être présent ?',
                            type: "boolean",
                        } 
                    }
                }
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

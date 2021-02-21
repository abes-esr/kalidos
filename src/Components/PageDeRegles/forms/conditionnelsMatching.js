import { generator } from "../generator";
import { conditions } from "./conditions";

export function formatRuleConditionnelsMatching(data) {
    console.log('formatRuleConditionnelsMatching');
    const obj = {};
    obj.number = data.number;
    obj.condition = data.condition;
    obj.values = data.values.map(val => {
        let value = {}
        value.number = val.number
        value.code = val.code
        value.regex = generator(val.rule, val.patterns, val.isWord)
        value.subFieldRequired = val.subFieldRequired? val.subFieldRequired : false
        value.message = val.message
        return value
    });
    
    obj.type = data.type;
    obj.message = data.message;
    console.log(obj);
    return obj;
}

export function getSchemaConditionnelsMatching(categories, rules) {
    return {
        type: "object",
        properties: {
            category: {
                title: 'Type de document',
                type: 'string',
                enum: categories.fields, enumNames: categories.tags
            },
            numRuleExcell: {
                title: "Identifiant Excel",
                type: "number",
            },
            condition: conditions,
            number: {
                title: "Zone",
                type: "string",
            },
            values: {
                title:"Règles de types Matching à évaluer",
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
                        subFieldRequired: {
                            title: "Le subfield doit être présent ?",
                            type: "boolean"
                        },
                        message: {
                            title: 'Message à afficher',
                            type: 'string',
                        },
                          
                    },
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
        required: ['category','numRuleExcell', 'number', 'condition','type', 'values', 'message'],
    }
}

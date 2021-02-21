import { mathOperators } from "../operators";
import { conditions } from "./conditions";

export function formatRuleConditionnelsDependance(data) {
    console.log('formatRuleConditionnelsDependance');
    const obj = {};
    obj.condition = data.condition;
    obj.message = data.message;
    obj.field1 = data.field1;    
    obj.field2 = data.field2;
    obj.operator = data.operator;
    console.log(obj);
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
                        type: "string",
                    },
                    code: {
                        title: 'Sous Zone',
                        type: 'string',
                    }
                },
                required: ['number', 'code']
            }
        },
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
            field1: {title:"Premier champ","$ref": "#/definitions/champs"},
            field2: {title:"Deuxiéme champ","$ref": "#/definitions/champs"},
            operator: {
                title: "Opérateur à appliquer",
                type: "string",
                enum: mathOperators.rules,
                enumNames: mathOperators.names
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category','numRuleExcell','field1', 'field2', 'operator', 'condition'],
    }
}

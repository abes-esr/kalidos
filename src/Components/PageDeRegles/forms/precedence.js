import { conditions } from './conditions';

export function formatRulePrecedence(data) {
    //console.log('formatRulePrecedence');
    const obj = {};
    obj.number = data.number;
    obj.precede = data.precede;
    obj.condition = data.condition;
    obj.message = data.message;
    console.log(obj);
    return obj;
}


export function getSchemaPrecedence(categories, rules) {
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
            number: {
                title: "Zone",
                type: "string",
            },
            condition: conditions,
            precede: {
                title:"Precede",            
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
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category', 'numRuleExcell', 'number', 'condition', 'precede', 'message'],
    }
}

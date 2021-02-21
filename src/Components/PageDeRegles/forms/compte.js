export function formatRuleCompte(data) {
    console.log('formatRuleCompte');
    console.log(data)
    const obj = {};
    obj.number = data.number;
    obj.code = data.code;
    obj.contrainte = data.contrainte;
    obj.message = data.message;
    console.log(obj);
    return obj;
}

export function getSchemaCompte(categories, rules) {
    return {
        type: "object",
        properties: {
            category: {
                title: 'Type de document',
                type: 'string',
                enum: categories.fields, 
                enumNames: categories.tags
            },
            numRuleExcell: {
                title: "Identifiant Excel",
                type: "number",
            },
            number: {
                title: 'Zone',
                type: 'string',
            },
            code: {
                title: 'Sous Zone',
                type: 'string',
            },
            contrainte: {
                title: 'Numéro de zone qui servira de comparateur',
                type: 'string',
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category','numRuleExcell', 'number', 'code', 'contrainte', 'message'],

    }
}

export function formatRuleCompte(data) {
    //console.log('formatRuleCompte');
    const obj = {};
    obj.number = data.number;
    obj.code = data.code;
    obj.contrainte = data.contrainte;
    obj.message = data.message;
    return obj;
}

export function getSchemaCompte(categories, rules) {
    return {
        type: "object",
        properties: {
            category: {
                title: 'Type de document',
                type: 'string',
                enum: categories,
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
                title: 'Contrainte',
                type: 'string',
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category', 'number', 'code', 'contrainte', 'message'],

    }
}

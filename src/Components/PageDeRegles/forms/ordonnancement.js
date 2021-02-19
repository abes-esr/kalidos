export function formatRuleOrdonnancement(data) {
    //console.log('formatRuleOrdonnancement');
    const obj = {};
    obj.number = data.number;
    obj.orderBy = data.orderBy;
    obj.message = data.message;
    return obj;
}


export function getSchemaOrdonnancement(categories, rules) {
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
            orderBy: {
                title: 'Ordonner par',
                type: 'string',
                enum: ['ind1', 'ind2'],
                enumNames: ['Indice 1', 'Indice 2']
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category', 'number', 'orderBy', 'message'],
    }
}

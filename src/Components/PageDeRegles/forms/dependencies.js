export function formatRuleDependencies(data) {
    console.log('formatRuleDependencies');
    const obj = {};
    obj.operator = data.operator;
    obj.message = data.message;
    obj.field1 = {
        number: data.field1_number,
        code: data.field1_code,
        pos: data.field1_pos,
    }
    obj.field2 = {
        number: data.field2_number,
        code: data.field2_code,
        pos: data.field2_pos,
    }
    return obj;
  }

export function getSchemaDependencies(categories, rules) {
    return {
        definitions: {
            champs: {
                type: "object",
                properties: {
                    number: {
                        title: "Zone",
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                    Pos: {
                        title: "Position",
                        type: "string",
                        enum: ["[]", "[9,13]", "[13,17]", "[0,4]", "[0,2]"],
                    },
                },
            },
        },
        type: "object",
        properties: {
            billing_address: {title:"Premier champs","$ref": "#/definitions/champs"},
            shipping_address: {title:"Deuxiéme champs","$ref": "#/definitions/champs"},
            Operator: {
                title: "Opérateur",
                type: "string",
                enum: ["<=", "="],
            },
            message: {
                title: "Message à afficher",
                type: "string",
                enum: rules.rules,
            },
        },
    }
}

                    /*category2: {
                        title: "Deuxiéme Champs",
                    },
                    number2: {
                        title: "Zone",
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                    Pos2: {
                        title: "Position",
                        type: "string",
                        enum: ["[]", "[9,13]","[13,17]","[0,4]","[0,2]"],
                    },*/

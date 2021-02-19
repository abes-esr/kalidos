import mathOperators from '../operators';

export function formatRuleDependencies(data) {
    //console.log('formatRuleDependencies');
    const obj = {};
    obj.operator = data.operator;
    obj.message = data.message;
    obj.field1 = {
        number: data.field1.number,
        code: data.field1.code,
        pos: data.field1.pos? data.field1.pos : [],
    }
    obj.field2 = {
        number: data.field2_number,
        code: data.field2_code,
        pos: data.field2_pos? data.field2.pos : [],
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
                        type: "string",
                    },
                    code: {
                        title: 'Sous Zone',
                        type: 'string',
                    },
                    pos: {
                        title: "Position",
                        type: "array",
                        maxItems: 2,
                        items:{
                            title: " Position dans le XML",
                            type: "number"
                        }
                    },
                },
                required: ['number', 'code'],

            },
        },
        type: "object",
        properties: {
            category: {
                title: 'Type de document',
                type: 'string',
                enum: categories,
            },
            operator: {
                title: "Opérateur",
                description: "Opérateur à appliquer",
                type: "string",
                enum: mathOperators.rules,
                enumNames: mathOperators.names
            },
            field1: {title:"Premier champ","$ref": "#/definitions/champs"},
            field2: {title:"Deuxiéme champ","$ref": "#/definitions/champs"},
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
        required: ['category', 'operator', 'field1', 'field2', 'message'],

    }
}

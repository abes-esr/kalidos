import { getOperator } from '../generator';

export function formatRuleDependencies(data) {
    console.log('formatRuleDependencies');
    const obj = {};
    obj.operator = getOperator(data.operator);
    obj.message = data.message;
    obj.field1 = {
        number: data.field1.number,
        code: data.field1.code,
        pos: data.field1.pos,
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
                        type: "number",
                    },
                    code: {
                        title: 'Sous Zone',
                        type: 'string',
                    },
                    pos: {
                        title: "Position",
                        type: "string",
                        enum: ["[]", "[9,13]", "[13,17]", "[0,4]", "[0,2]"],
                    },
                },
            },
        },
        type: "object",
        properties: {
            field1: {title:"Premier champ","$ref": "#/definitions/champs"},
            field2: {title:"Deuxiéme champ","$ref": "#/definitions/champs"},
            operator: {
                title: "Opérateur",
                type: "string",
                enum: ["<","<=", "=", ">=", ">"],
                enumNames: ["Plus petit","Plus petit ou egal", "Egal", "Plus grand ou egal", "Plus grand"]
            },
            message: {
                title: "Message à afficher",
                type: "string",
            },
        },
    }
}

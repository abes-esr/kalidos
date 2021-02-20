import { structuralOperators } from "../operators";

export function formatRuleStructurel(data) {
  console.log('formatRuleStructurel');
  const obj = {};
  obj.message = data.message;
  obj.number = data.number;
  obj.ind1 = data.ind1;
  obj.ind2 = data.ind2;
  obj.code = data.code;
  obj.type = data.type;
  console.log(obj);
return obj;
}

export function getSchemaStructurel(categories, rules) {
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
        type: 'array',
        items: {
          type: 'string',
        },
      },
      code: {
        title: 'Sous Zone',
        type: 'string',
      },
      ind1: {
        title: "Indice 1",
        type: "string",
        default: ""
      },
      ind2: {
        title: "Indice 2",
        type: "string",
        default: ""
      },
      type:{
        title: "Type de contrainte",
        enum: structuralOperators.rules,
        enumNames: structuralOperators.names
      },
      message: {
        title: "Message à afficher",
        type: "string",
      },
    },
    required: ['category', 'number', 'type', 'message'],

  }
}

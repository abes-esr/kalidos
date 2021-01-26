
export function formatRuleStructurel(data) {
  console.log('formatRuleStructurel');
  const obj = {};
  obj.message = data.message;
  obj.number = data.number;
  obj.ind1 = data.ind1 ? data.ind1 : "";
  obj.ind2 = data.ind2 ? data.ind2 : "";
  obj.type = data.type;
  if (data.type === 'Obligatoire avec valeur') 
    obj.value = data.value;
  return obj;
}

export function getSchemaStructurel(categories, rules) {
    return {
        type: "object",
        properties: {
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
            type: "string"
          },
          ind2: {
            title: "Indice 2",
            type: "string"
          },
          type:{
            title: "Type",
            enum: ["required", "require with value", "exclude"],
            enumNames: ["Obligatoire", "Obligatoire avec valeur", "Exclure"]
          },
          value:{
            title: 'Valeur (Obligatoire avec valeur)',
            type: 'string',
          },
          message: {
            title: "Message à afficher",
            type: "string",
          },
        },
    }
}

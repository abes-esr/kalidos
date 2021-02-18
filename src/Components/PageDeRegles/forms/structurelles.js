
export function formatRuleStructurel(data) {
  console.log('formatRuleStructurel');
  const obj = {};
  obj.message = data.message;
  obj.number = data.number;
  obj.ind1 = data.ind1 ? data.ind1 : "";
  obj.ind2 = data.ind2 ? data.ind2 : "";
  obj.code = data.code ? data.code : "";
  obj.type = data.type;
  if (data.type === 'required with value') 
    obj.value = data.value;
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
        type: "string"
      },
      ind2: {
        title: "Indice 2",
        type: "string"
      },
      type:{
        title: "Type",
        enum: ["required", "require one", "exclude", "contains code", "index", "required with value"],
        enumNames: ["Obligatoire", "Une seule est obligatoire", "Exclure", "Contiens sous zone", "Indice", "Obligatoire avec valeur",]
      },
      value:{
        title: 'Valeur',
        description: "Valeur à utiliser pour l'option 'Obligatoire avec valeur'",
        type: 'string',
      },
      message: {
        title: "Message à afficher",
        type: "string",
      },
    },
    required: ['category', 'number', 'type', 'message'],

  }
}

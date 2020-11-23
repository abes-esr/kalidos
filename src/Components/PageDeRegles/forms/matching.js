export function getSchema(categories, rules) {
  return {
    type: "object",
    properties: {
      category: {
        title: "Type de document",
        type: "string",
        enum: categories,
      },
      number: {
        title: "Zone",
        type: "array",
        items: {
          type: "string",
        },
      },
      regex: {
        title: "Regle a utiliser",
        type: "string",
        enum: rules.rules,
        enumNames: rules.names
      },
      pattern: {
        title: "Value", 
        type: "array",
        items:{
          type:"string"
        }
      },
      match: {
        title: "Match",
        type: "string",
        enum: ["all", "one"],
      },
    },
  }
}
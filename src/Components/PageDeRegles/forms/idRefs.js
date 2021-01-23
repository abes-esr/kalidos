export function formatRuleIdRef(data) {
  console.log('formatRuleIdRef');
  const obj = {};
  obj.operator = data.operator;
  obj.message = data.message;
  obj.condition = {
    number: data.number,
    code: data.code,
  }
  obj.identifiant = {
    code: data.code,
  }
  obj.condition = {
    number: data.number,
    regex: generator(data.rule, data.patterns, data.isWord),
  }
  return obj;
}

export function getSchemaIdRef(categories, rules) {
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

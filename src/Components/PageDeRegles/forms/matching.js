import { generator, applyRule } from '../generator';
export function formatDataMatching(data){
  let obj = data;
  obj.number = Array.isArray(data.number)? data.number : [data.number];
  return data
}

export function formatRuleMatching(data) {
  //console.log('formatRuleMatching');
  const obj = {};
  obj.code = data.code;
  obj.message = data.message;

  if (data.datafields === 'Un') {
    obj.number = data.number;
    obj.regex = generator(data.rule, data.patterns, data.isWord);
  } else {
    obj.number = data.number;
    obj.value = applyRule(data.rule, data.values);
    obj.match = data.match;
  }
  console.log(obj);
return obj;
}

export function getSchemaMatching(categories, rules) {
  return {
    type: 'object',
    properties: {
      category: {
        title: 'Type de document',
        type: 'string',
        enum: categories,
      },
      numRuleExcell: {
        title: "Nombre de ligne sur Excel",
        type: "number",
      },
      datafields:{
        title: 'Quantite de datafields',
        type: 'string',
        enum: ['Un', 'Plusieurs'],
      },
    },
    required: ['category','numRuleExcell','datafields'],
    dependencies: {
      datafields: {
        oneOf: [
          {
            properties: {
              datafields: { enum: ['Un'] },
              number: {
                title: 'Zone',
                type: 'string',
              },
              code: {
                title: 'Sous Zone',
                type: 'string',
              },
              rule: {
                title: 'Règle à utiliser',
                type: 'string',
                enum: rules.rules,
                enumNames: rules.names,
              },
              isWord: {
                title: 'Le(s) motif(s) ont plusieurs caractères?',
                enum: [true, false],
                enumNames: ["Oui", "Non"]
              },
              patterns: {
                title: "Motifs",
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              message: {
                title: 'Message à afficher',
                type: 'string',
              },
            },
            required: ['number', 'code', 'isWord', 'rule', 'patterns', 'message']
          },
          {
            properties: {
              datafields: { enum: ['Plusieurs'] },
              number: {
                title: 'Zones',
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              code: {
                title: 'Sous Zone',
                type: 'string',
              },
              rule: {
                title: 'Règle a utiliser',
                type: 'string',
                enum: rules.rules,
                enumNames: rules.names,
              },
              values: {
                title: 'Valeurs',
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              match: {
                title: 'Match',
                type: 'string',
                enum: ['all', 'one'],
                enumNames: ['Tous', 'Un']
              },
              message: {
                title: 'Message à afficher',
                type: 'string',
              },
            },
            required: ['number', 'code','rule', 'values', 'match', 'message']
          },
        ]
      }
    }
  };
}

import { generator, applyRule } from '../generator';

export function formatRuleMatching(data) {
  console.log('formatRuleMatching');
  const obj = {};
  obj.code = data.code;
  obj.message = data.message;

  if (data.number.length === 1) {
    // eslint-disable-next-line prefer-destructuring
    obj.number = data.number[0];
    obj.regex = generator(data.rule, data.patterns, data.isWord);
  } else {
    obj.number = data.number;
    obj.value = applyRule(data.rule, data.patterns, data.isWord);
    obj.match = data.match;
  }
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
      rule: {
        title: 'Regle a utiliser',
        type: 'string',
        enum: rules.rules,
        enumNames: rules.names,
      },
      isWord: {
        title: ' Le motif contiens de mots',
        type: 'boolean',
        enum: [true, false],
        enumNames: ["Oui", "Non"]
      },
      patterns: {
        title: 'Motif(s) a utiliser par la regle',
        type: 'array',
        items: {
          type: 'string',
        },
      },
      match: {
        title: 'Match',
        type: 'string',
        enum: ['all', 'one'],
      },
      message: {
        title: 'Vérification',
        type: 'string',
      },
    },
    required: ['category', 'number', 'code', 'isWord', 'message'],
  };
}

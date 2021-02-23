import { generator, applyRule } from '../generator';
import { regexCreator } from './regex'

export function formatDataMatching(data){
  let obj = data;
  obj.number = Array.isArray(data.number)? data.number : [data.number];
  return data
}

/**
 * Functions pour la création des schemas (react-json-schema), et la formalisation des données. 
 * pour les règles de type : 
 * ______________________________________    MATCHING    ______________________________________ 

 */

/**
 * Function pour donner le format approprié aux données soumises par l'utilisateur.
 * @param {*} data
 */
export function formatRuleMatching(data) {
    //console.log('formatRuleMatching');
    const obj = {};
    obj.code = data.code;
    obj.message = data.message;

    if (data.datafields === 'Un') {
      obj.number = data.number;
      obj.regex = generator(data.regex.rule, data.regex.patterns, data.regex.isWord);
    } else {
      obj.number = data.number;
      obj.value = applyRule(data.rule, data.values);
      obj.match = data.match;
    }
    console.log(obj);
    obj.numRuleExcell = data.numRuleExcell
   return obj;
}

/**
 * Fonction pour la création du schema.
 * 
 * @param {
 *      fields : liste de catégories dans le fichier json
 *      tags : liste de tags à afficher
 * } categories Liste de catégories 
 * @param {
 *      rules : liste de règles sur des motifs, pour le générateur (generator.js)
 *      names : liste de tags à afficher pour chaque règle
 * } rules 
 */
export function getSchemaMatching(categories, rules) {
  return {
    type: 'object',
    properties: {
      category: {
        title: 'Type de document',
        type: 'string',
        enum: categories.fields, enumNames: categories.tags
      },
      numRuleExcell: {
        title: "Identifiant Excel",
        type: "number",
      },
      datafields:{
        title: 'Quantite de datafields',
        type: 'string',
        enum: ['Un', 'Plusieurs'],
      },
    },
    required: ['category','datafields'],
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
                default: ""
              },
              regex: regexCreator(rules),
              message: {
                title: 'Message à afficher',
                type: 'string',
                default: ""
              },
            },
            required: ['number','regex']
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
                default: ""
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
            required: ['number','rule', 'values', 'match', 'message']
          },
        ]
      }
    }
  };
}

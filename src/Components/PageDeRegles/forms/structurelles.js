import { structuralOperators } from "../operators";


/**
 * Functions pour la creation des schemas (react-json-schema), et la formalisation des donnees 
 * pour les regles de type : 
 * ______________________________________    STRUCTUREL    ______________________________________ 
 */

/**
 * Function pour donner le format appropie aux donnes soumis par l'utilisateur
 * @param {*} data
 */
export function formatRuleStructurel(data) {
    //console.log('formatRuleStructurel');
    const obj = {};
    obj.message = data.message;
    obj.number = data.number;
    obj.ind1 = data.ind1;
    obj.ind2 = data.ind2;
    obj.code = data.code;
    obj.type = data.type;
    obj.numRuleExcell = data.numRuleExcell
    console.log(obj);
    return obj;
}

/**
 * Fonction pour la creation du schema
 * 
 * @param {
 *      fields : liste de categories dans le fichier json
 *      tags : liste de tags a afficher
 * } categories Liste de categories 
 * @param {
 *      rules : liste de regles sur des motifs, pour le generateur (generator.js)
 *      names : liste de tags a afficher pour chaque regle
 * } rules 
 */
export function getSchemaStructurel(categories, rules) {
  return {
    type: "object",
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
        default: ""
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

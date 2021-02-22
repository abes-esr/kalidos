import { getSchemaMatching, formatRuleMatching } from '../forms/matching';
import { getSchemaIdRef, formatRuleIdRef } from '../forms/idRefs'
import { getSchemaDependencies, formatRuleDependencies } from '../forms/dependencies';
import { getSchemaStructurel, formatRuleStructurel } from '../forms/structurelles';
import { getSchemaConditionnelsMatching, formatRuleConditionnelsMatching } from '../forms/conditionnelsMatching';
import { getSchemaConditionnelsStructurel, formatRuleConditionnelsStructurel } from '../forms/conditionnelsStructurel';
import { getSchemaConditionnelsDependance, formatRuleConditionnelsDependance } from '../forms/conditionnelsDependance';
import { getSchemaCompte, formatRuleCompte } from '../forms/compte';
import { getSchemaOrdonnancement, formatRuleOrdonnancement } from '../forms/ordonnancement';
import { getSchemaPrecedence, formatRulePrecedence } from '../forms/precedence';


/**
 * Fonction qui retourne un tableau avec la specification de chaque type
 * Objets de la forme :
 *  { 
 *    name: Nom a afficher dans l'interface, 
 *    type: Type dans le fichier json des regles,
 *    description: Description de la regle,
 *    schema: schema de la regle,
 *    submit: fonction de formalisation de la regle (formatRule...),
    },
 * 
 * 
 * @param {
 *      fields : liste de categories dans le fichier json
 *      tags : liste de tags a afficher
 * } categories 
 * @param {
 *      rules : liste de regles sur des motifs, pour le generateur (generator.js)
 *      names : liste de tags a afficher pour chaque regle
 * } rules 
 */
export function typesSpec(categories, rules) {
  return [
    { name: "Matching", 
      type: "matching",
      gif: "https://i.ibb.co/WPvv5xJ/matchingun.gif",
      description: "Ce type de règle permet d'imposer une contrainte sur la chaine de caractère d'une Sous Zone si elle existe. Nous rappelons l'exemple : Le champ (Zone$Sous Zone)  230$a ne doit pas contenir 'Mo'. Il est également possible d’inclure plusieurs champs dans une même règle et plusieurs motifs à matcher. Par exemple : 700$4 et 701$4 ne doivent pas contenir les valeurs 020, 050, 060.",
      schema: getSchemaMatching(categories, rules),
      submit: formatRuleMatching,
    },
    { name: "Dépendances", 
      type: "dependances",
      gif: "https://i.ibb.co/wL0hR5c/dependences.gif",
      description: "Ce type de règle effectue une opération de comparaison entre deux champs d'un même document, ce type de règle s'intéresse a la valeur des Sous Zone. Nous rappelons l'exemple : les 4 premiers caractères du sous champs (Zone$SousZone) 029$b doit être égale au champs (Zone$SousZone) 328$d ",
      schema: getSchemaDependencies(categories, rules),
      submit: formatRuleDependencies,
    },
    { name: "Conditionnels Matching", 
      type: "ConditionMatching",
      gif: "../../../../static/compte.gif",
      description: "Description du type Conditionnels",
      schema: getSchemaConditionnelsMatching(categories, rules),
      submit: formatRuleConditionnelsMatching,
    },
    { name: "Conditionnels Dependance", 
      type: "ConditionDependance",
      gif: "../../../../static/compte.gif",
      description: "Description du type Conditionnels",
      schema: getSchemaConditionnelsDependance(categories, rules),
      submit: formatRuleConditionnelsDependance,
    },
    { name: "Conditionnels Structurel", 
      type: "ConditionStructurel",
      gif: "../../../../static/compte.gif",
      description: "Description du type Conditionnels",
      schema: getSchemaConditionnelsStructurel(categories, rules),
      submit: formatRuleConditionnelsStructurel,
    },
    { name: "Structurels", 
      type: "Structurel",
      gif: "https://i.ibb.co/mD4Qt1g/structurel1.gif",
      description: "Ce type de règle impose des contraintes sur la structure du document. Nous rappelons l'exemple : la Zone '328' doit contenir : indice 1 ='' et indice 2='0'",
      schema: getSchemaStructurel(categories, rules),
      submit: formatRuleStructurel,
    },
    { name: "Références", 
      type: "idRef",
      gif: "../../../../static/compte.gif",
      description: "Description du type idRef",
      schema: getSchemaIdRef(categories, rules),
      submit: formatRuleIdRef,
    },
    { name: "Ordonnancement", 
      type: "ordonnancement",
      gif: "https://i.ibb.co/JHX6X1k/ordonnancement.gif",
      description: "Ce type de règle vérifie l'ordonnancement de toutes les Zone possédant le même identifiant, en effet il faut qu'elles soient triée en fonction de leur indice (1 ou 2).Nous rappelons l'exemple : Si plusieurs zones sont égale à 214, alors elles doivent respecter l'ordre des chiffres de l'indice 2",
      schema: getSchemaOrdonnancement(categories, rules),
      submit: formatRuleOrdonnancement,
    },
    { name: "Compte", 
      type: "compte",
      gif: "https://i.ibb.co/vYZFvDJ/compte.gif",
      description: "Ce type de règle vérifie que le nombre de document avec une certaine Zone combiner avec sa Sous Zone doit être égale au nombre de Zone d'un autre document. Par exemple : Si plusieurs Zone$SousZone sont égales à '101$d' , il doit y avoir autant de  document avec la zone '330'",
      schema: getSchemaCompte(categories, rules),
      submit: formatRuleCompte,
    },
    { name: "Precedence", 
      type: "precedence",
      gif: "../../../../static/compte.gif",
      description: "Description du type Conditionnels",
      schema: getSchemaPrecedence(categories, rules),
      submit: formatRulePrecedence,
    },
  ]
}
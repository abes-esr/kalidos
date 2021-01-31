import { getSchemaMatching, formatRuleMatching } from '../forms/matching';
import { getSchemaIdRef, formatRuleIdRef } from '../forms/idRefs'
import { getSchemaDependencies, formatRuleDependencies } from '../forms/dependencies';
import { getSchemaStructurel, formatRuleStructurel } from '../forms/structurelles';
import { getSchemaConditionnelsMatching, formatRuleConditionnelsMatching} from '../forms/conditionnelsMatching';
import { getSchemaConditionnelsStructurel, formatRuleConditionnelsStructurel} from '../forms/conditionnelsStructugetSchemaConditionnelsStructurel';
import { getSchemaConditionnelsDependance, formatRuleConditionnelsDependance} from '../forms/conditionnelsDepgetSchemaConditionnelsDependance';
import { getSchemaCompte, formatRuleCompte} from '../forms/conditionnelsDepgetSchemaCompte';
import { getSchemaOrdonnancement, formatRuleOrdonnancement} from '../forms/conditionnelsDepgetSchemaOrdonnancement';
import { getSchemaPrecedence, formatRulePrecedence} from '../forms/conditionnelsDepgetSchemaPrecedence';

export function typesSpec(categories, rules) {
  return [
    { name: "Matching", 
      type: "matching",
      description: "Description du type matching",
      schema: getSchemaMatching(categories, rules),
      submit: formatRuleMatching,
    },
    { name: "Dépendances", 
      type: "dependances",
      description: "Description du type dependances",
      schema: getSchemaDependencies(categories, rules),
      submit: formatRuleDependencies,
    },
    { name: "Conditionnels Matching", 
      type: "ConditionMatching",
      description: "Description du type Conditionnels",
      schema: getSchemaConditionnelsMatching(categories, rules),
      submit: formatRuleConditionnelsMatching,
    },
    { name: "Conditionnels Dependance", 
      type: "ConditionDependance",
      description: "Description du type Conditionnels",
      schema: getSchemaConditionnelsDependance(categories, rules),
      submit: formatRuleConditionnelsDependance,
    },
    { name: "Conditionnels Structurel", 
      type: "ConditionStructurel",
      description: "Description du type Conditionnels",
      schema: getSchemaConditionnelsStructurel(categories, rules),
      submit: formatRuleConditionnelsStructurel,
    },
    { name: "Structurels", 
      type: "Structurel",
      description: "Description du type Structurel",
      schema: getSchemaStructurel(categories, rules),
      submit: formatRuleStructurel,
    },
    { name: "Références", 
      type: "idRef",
      description: "Description du type idRef",
      schema: getSchemaIdRef(categories, rules),
      submit: formatRuleIdRef
    },
    { name: "Ordonnancement", 
      type: "ordonnancement",
      description: "Description du type Conditionnels",
      schema: getSchemaOrdonnancement(categories, rules),
      submit: formatRuleOrdonnancement,
    },
    { name: "Compte", 
      type: "compte",
      description: "Description du type Conditionnels",
      schema: getSchemaCompte(categories, rules),
      submit: formatRuleCompte,
    },
    { name: "Precedence", 
      type: "precedence",
      description: "Description du type Conditionnels",
      schema: getSchemaPrecedence(categories, rules),
      submit: formatRulePrecedence,
    },
  ]
}
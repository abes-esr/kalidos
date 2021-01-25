import { getSchemaMatching, formatRuleMatching } from '../forms/matching';
import { getSchemaIdRef, formatRuleIdRef } from '../forms/idRefs'
import { getSchemaDependencies, formatRuleDependencies } from '../forms/dependencies';
import { getSchemaStructurel, formatRuleStructurel } from '../forms/structurelles';
import { getSchemaConditionnels} from '../forms/conditionnels';

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
    { name: "Conditionnels", 
      type: "Conditionnels",
      description: "Description du type Conditionnels",
      schema: getSchemaMatching(categories, rules),
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
    }
  ]
}
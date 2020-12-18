import { getSchemaMatching, formatRule } from '../forms/matching';
import { getSchemaDependencies } from '../forms/depences';
import { getSchemaConditionnels} from '../forms/conditionnels';

export function typesSpec(categories, rules) {
  return [
    { name: "Matching", 
      type: "matching",
      description: "Description du type matching",
      schema: getSchemaMatching(categories, rules),
      submit: formatRule,
    },
    { name: "Dépendances", 
      type: "dependances",
      description: "Description du type dependances",
      schema: getSchemaMatching(categories, rules),
    },
    { name: "Conditionnels", 
      type: "Conditionnels",
      description: "Description du type Conditionnels",
      schema: getSchemaMatching(categories, rules),
    },
    { name: "Structurels", 
      type: "Structurel",
      description: "Description du type Structurel",
      schema: getSchemaMatching(categories, rules),
    },
    { name: "Références", 
      type: "idRef",
      description: "Description du type idRef",
      schema: getSchemaMatching(categories, rules),
    }
  ]
}
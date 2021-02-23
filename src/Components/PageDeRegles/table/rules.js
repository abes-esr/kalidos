/**
 * Filters the model_regles_tries.json to a single list of all the rules
 * having the category and type inside the element.
 * @param {Array} result 
 */
export const filtering = (result) => {
  let rules = []
  let categories = []
  for (const category in result) {
    categories.push(category)
    for (const type in result[category]) {
      let filter = result[category][type].map((r) => {
        r.regleInitial = Object.assign({}, r);
        if (Array.isArray(r.number)) { r.number = r.number.toString() }
        r.category = tagCategorie(category)
        r.type = type
        r.action = ""
        delete r.regex
        return r
      })
      rules = rules.concat(filter)
    }
  }
  return { rules: rules, categories: tagCategories(categories) }
};


/**
 * Retourne le tag appropié à la categorie c passée en paramètre.
 * @param {String} c 
 */
function tagCategorie(c) {
  switch (c) {
    case 'AutreDocuments':
      return 'Monographies imprimées et autres documents'
    case 'MémoireSoutenance':
      return 'Thèse et Mémoires (Soutenance)';
    case 'MémoireReproduction':
      return 'Thèse et Mémoires (Reproduction)';
    case 'Electronique':
      return 'Monographie électronique';
    case 'Generale':
      return 'Générale';    
    default:
      break;
  }
}

/**
 * Retourne un objet de type:
 * {
 *    fields: Liste de catégories dans le fichier json
 *    tags: Tags à afficher dans le schema
 * }
 * @param {Array} categories 
 */
function tagCategories(categories) {
  let tags = categories.map(c => tagCategorie(c))

  return {
    fields: categories,
    tags: tags
  }
}
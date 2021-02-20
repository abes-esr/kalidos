/**
 * Filters the model_regles_tries.json to a single list of all the rules
 * having the category and type inside the element
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
        r.category = category
        r.type = type
        r.action = ""
        delete r.regex
        return r
      })
      rules = rules.concat(filter)
    }
  }
  return { rules: rules, categories: categories }
};

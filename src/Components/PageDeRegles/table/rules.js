export const filtering = (result) => {
  let rules = []
  let categories = []
  for (const category in result) { // category => {Generale, Memoire, Electronique}
    categories.push(category)
    /***************************************************************
     *     IF TO REMOVE ONCE MEMORE AND ELECTRONIQUE ARE ADDED
     ***************************************************************/
    // if (category == "Generale") {
    for (const type in result[category]) {
      let filter = result[category][type].map((r) => {
        r.regleInitial = Object.assign({}, r);
        r.index = r.index + '_' + type + '_' + category
        if (Array.isArray(r.number)) { r.number = r.number.toString() }
        r.category = category
        r.type = type
        r.action = ""
        delete r.regex
        return r
      })
      rules = rules.concat(filter)
    }
    // }
  }
  return { rules: rules, categories: categories }
};

/** 
 * Deletes a rule from the table
 * @param {*} row 
 * @param {*} rules 
 */
export const deleting = (row, rules) => {
  var headers = new Headers();
  headers.set("index", row.index)
  fetch("/rules", {
    method: 'DELETE',
    headers: headers
  }).then(res => console.log(res))
  return rules.filter(rule => rule.index != row.index)
}

/**
 * Edits a row on the table
 * @param {*} row 
 */
export const editing = (row, rules) => {

}

export const adding = () => {

}

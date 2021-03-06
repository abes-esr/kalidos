/**
 * GENERATEUR DE REGEX
 * 
 * Les fonctions suivantes font partie de la génération de regex pour les champs 'regex' dans les règles.
 */
export const rulesSpec = {
  rules: [
    "must contain",
    "must not contain",
    "equals to",
    "not equals to",
    "starts with",
    "not starts with",
    "ends with",
    "not ends with",
    "characters number"
  ],
  names: [
    "Doit contenir",
    "Ne doit pas contenir",
    "Égale à",
    "Ne soit pas égale à",
    "Commence par ",
    "Ne doit pas commencer par",
    "Finit par",
    "Ne doit pas finir par",
    "Nombre de caractères"
  ]
}


export function characters_number(value) {
  return ['.', '{'+value+'}']
}

export function must_contain(isWord, words) {
  let isOne = words.length > 1 ;
  return isOne ? ['.*', '.*'] : isWord? ['.*(', ').*'] : ['.*[', '].*']
}

export function must_not_contain(isWord) {
  return isWord? ['(?:(?!', ').)+'] : ['(?:(?![', ']).)+']
}

export function equals_to(isWord) {
  return isWord? ['(', ')'] : ['[', ']']
}

export function not_equals_to(isWord) {
  return isWord? ['^((?!', ').)*$'] : ['^((?![', ']).)*$']
}

export function starts_with(isWord) {
  return isWord? ['^(', ').*'] : ['^([', ']).*']
}

export function not_starts_with(isWord) {
  return isWord? ['^(?!(', ')).*'] : ['^(?!([', '])).*']
}

export function ends_with(isWord){
  return isWord? ['.*(', ')\\b$'] : ['.*([', '])\\b$']
}

export function not_ends_with(isWord) {
  return isWord? ['.*(?<!(', '))$'] : ['.*(?<!(', ']))$']
}

export function applyRule(func, items){
  let prefix, sufix = ''
  switch (func) {
    case "must contain":
      [prefix , sufix] = must_contain(true,items)
      break;
    case "must not contain":
      [prefix , sufix] = must_not_contain(true)
      break;
    case "equals to":
      [prefix , sufix] = equals_to(true)
      break;
    case "not equals to":
      [prefix , sufix] = not_equals_to(true)
      break;
    case "starts with":
      [prefix , sufix] = starts_with(true)
      break;
    case "not starts with":
      [prefix , sufix] = not_starts_with(true)
      break;
    case "ends with":
      [prefix , sufix] = ends_with(true)
      break;
    case "not ends with":
      [prefix , sufix] = not_ends_with(true)
      break;
    default:
      break;
  }
  return items.map(i => prefix + i + sufix)
}

export function generator (func, items, isWord) {
  let regex, prefix, sufix = ''
  switch (func) {
    case "must contain":
      [prefix , sufix] = must_contain(isWord,items)
      break;
    case "must not contain":
      [prefix , sufix] = must_not_contain(isWord)
      break;
    case "equals to":
      [prefix , sufix] = equals_to(isWord)
      break;
    case "not equals to":
      [prefix , sufix] = not_equals_to(isWord)
      break;
    case "starts with":
      [prefix , sufix] = starts_with(isWord)
      break;
    case "not starts with":
      [prefix , sufix] = not_starts_with(isWord)
      break;
    case "ends with":
      [prefix , sufix] = ends_with(isWord)
      break;
    case "not ends with":
      [prefix , sufix] = not_ends_with(isWord)
      break;
    case "characters number":
      [prefix , sufix] = characters_number(items[0])
      items = []
      break;
    default:
      break;
  }

  let join = isWord ? '|' : ''
  regex = prefix + items.join(join) + sufix
  //console.log(func + ': ' + regex)
  return regex;
}


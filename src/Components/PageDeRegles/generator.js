
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

export function generator ({func, items, isWord}) {
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
    default:
      break;
  }

  let join = isWord ? '|' : ''
  regex = prefix + items.join(join) + sufix
  console.log(func + ': ' + regex)
  return regex;
}
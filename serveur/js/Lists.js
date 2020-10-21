const fs = require('fs');
const path = require('path');

/**
 * Recupere les listes des categories et des types de regles contenue dans le fichier model_regles.json
 * retourne une liste contenant en premiere position la liste des categories et en seconde la liste des types
 */
var Lists = function() {
  const json = fs.readFileSync(path.join(__dirname, '../public/model_regles.json'));
  let rules = JSON.parse(json);
  var listCategorie = [];
  var listType = [];
  // This is private because it is not being return
  
  var setup = function() {
    for (categorie in rules) {
      listCategorie.push(categorie)
    }
   
    if (listCategorie.length > 0) {
      for (type in rules[listCategorie[0]]) {
        listType.push(type)
      }
    }
    return [listCategorie,listType]
  }
  

  return {
      setup: setup
  }
}();

module.exports = Lists;


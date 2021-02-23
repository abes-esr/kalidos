const fs = require('fs');
const path = require('path');

/**
 * Récupère les listes des catégories et des types de règles contenues dans le fichier model_regles.json.
 * Retourne une liste contenant en première position la liste des catégories et en seconde la liste des types.
 */
var Lists = function() {
  const json = fs.readFileSync(path.join(__dirname, '../public/model_regles_tries.json'));
  let rules = JSON.parse(json);
  var listCategorie = [];
  var listType = [];
  // This is private because it is not being return
  
  var setup = function() {
    for (categorie in rules) {
      listCategorie.push(categorie);
    }
   
    if (listCategorie.length > 0) {
      for (type in rules[listCategorie[0]]) {
        listType.push(type);
      }
    }
    return [listCategorie,listType];
  }
  
  return {
    setup: setup
  }
}();

module.exports = Lists;


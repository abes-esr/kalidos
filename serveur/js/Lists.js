const fs = require('fs');
const path = require('path');


const json = fs.readFileSync(path.join(__dirname, '../public/model_regles.json'));

const rules = JSON.parse(json);

class Lists {
  constructor(json) {
    this.listCategorie = [];
    this.listType = [];

    for (categorie in json) {
      listCategorie.push(categorie)
    }
    if (listCategorie.length > 0) {
      for (type in json[listCategorie[0]]) {
        listType.push(type)
      }
    }
  }
}

module.exports = {Lists};
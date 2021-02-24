const _ = require('lodash');
var Lists = require('./Lists');

/**
 * Génère un indice de règle supérieur à tous ceux présents dans le fichier de règles
 * @param {*} json fichier de regles
 */
function idGenerator (json) {
    const res = Lists.setup();
    const listCategorie = res[0];
    const listType = res[1];
    let maxIndex = 0;
    
    for (categorie in listCategorie) {
        for (type in listType) {
            for (i = 0; i < json[listCategorie[categorie]][listType[type]].length; i++) {
                if (json[listCategorie[categorie]][listType[type]][i].index > maxIndex) {
                    maxIndex = json[listCategorie[categorie]][listType[type]][i].index;
                }
            }
        }
    }

    return maxIndex + 1;
};

/**
 * Egalité entre deux règles sans comparer les index
 * @param {*} rule1 
 * @param {*} rule2 
 */
function ruleEquals(rule1,rule2) {
    const index1 = rule1.index;
    const index2 = rule2.index;
    rule1.index = '';
    rule2.index = '';
    const ret = _.isEqual(rule1, rule2);
    rule1.index = index1;
    rule2.index = index2;
    return ret;
}


module.exports = { idGenerator,ruleEquals};
const _ = require('lodash');

/**
 * Genere un indice de regle superieur a tout ceux present dans le fichier de regles
 * @param {*} json fichier de regles
 */
function idGenerator (json) {
    let listCategorie = []
    let listType = []
    let maxIndex = 0;
    for (categorie in json) {
        listCategorie.push(categorie)
    } 
    if(listCategorie.length > 0) {
        for (type in json[listCategorie[0]]) {
            listType.push(type)
        }
    }
    
    for(categorie in listCategorie) {
        for (type in listType){
            
                for (i = 0; i < json[listCategorie[categorie]][listType[type]].length; i++) {
                    if(json[listCategorie[categorie]][listType[type]][i].index > maxIndex) {
                        maxIndex = json[listCategorie[categorie]][listType[type]][i].index
                    }
                } 
            
        }
    }

    return maxIndex + 1
    
    
};

/**
 * Egalité entre deux regles sans comparer les index
 * @param {*} rule1 
 * @param {*} rule2 
 */
function ruleEquals(rule1,rule2) {
    const index1 = rule1.index
    const index2 = rule2.index
    rule1.index = ''
    rule2.index = ''
    const ret = _.isEqual(rule1, rule2)
    rule1.index = index1
    rule2.index = index2
    return ret
}


module.exports = { idGenerator,ruleEquals};
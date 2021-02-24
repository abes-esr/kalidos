/**
 * Fichier 100% useless mais garde une place dans notre coeur.
 */
var Regex = function () {
  let chaine = "";
  function parcours(number,code,sudoc) {
    const leader = sudoc.record.leader;
    const controlfields = sudoc.record.controlfield;
    const datafields = sudoc.record.datafield;
    datafields.forEach(function (field) {
      if (field._attributes.tag === number) {
        if (field.subfield instanceof Array) {
          field.subfield.forEach(function (subfield) {
              if (subfield._attributes.code === code) {
                console.log(subfield._text);
                console.log(typeof subfield._text);
                chaine = subfield._text;
                return;
              }
          });
        } else {
          if (field.subfield._attributes.code === code) {
            chaine = subfield._text;
            return;
          }
        }
      }
    });

  }

  var transform = function (regex, sudoc) {
    //console.log("sudoc : ",sudoc)
    //console.log("regex : ",regex)
    if (regex.split('NOM').length > 1) {
      console.log(regex.split('NOM')[0]);
      console.log(regex.split('NOM')[1]);
      parcours("200","f",sudoc);
      console.log(chaine);
    }
  }

  return {
    transform: transform
  }
}();

module.exports = Regex;
var Matching = function () {
    var testMatchRegexRules = function (rules, controlfields , datafields , resultJson) {
        rules.Generale.matching.forEach(function (regle) {
            const regex = RegExp(regle.regex);
            datafields.forEach(function (field) {
    
                if (field._attributes.tag.toString() === regle.number.toString() || regle.number === "GLOBAL") {
                    if (field.subfield instanceof Array) {
                        field.subfield.forEach(function (subfield) {
                            if (subfield._attributes.code === regle.code || regle.number === "GLOBAL") {
                                if(!regex.test(subfield._text)) {
                                    resultJson.errors.push({
                                        message: regle.message,
                                        number: regle.number,
                                        code: regle.code
                                    });
                                }          
                            }
                        });
                    } else {
                        if (field.subfield._attributes.code === regle.code || regle.number === "GLOBAL") {
                            if(!regex.test(field.subfield._text)) {
                                resultJson.errors.push({
                                    message: regle.message,
                                    number: regle.number,
                                    code: regle.code
                                });
                            }
                        }
                    }
                }
            });
        });
    }
  
  
    return {
        testMatchRegexRules: testMatchRegexRules
    }
  }();
  
  module.exports = Matching;
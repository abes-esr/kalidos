var Structurel = function () {
    
    const findDataField = function(datafields,number) {
        let retour = null
        datafields.forEach(function (field) {
            if(field._attributes.tag === number) {
                retour = field
                return field
            }
          });
        return retour;
    }
    
    var testMatchStructurelRules = function (rules, controlfields , datafields,resultJson) {
        /*"number": "181",
                "ind1":"",
                "ind2":"",
                "code":"",
                "type":"required",
                "message": "181 obligatoire" 
        */

        rules.Generale.Structurel.forEach(function (regle) {
            const number = regle.number
            const ind1 = regle.ind1
            const ind2 = regle.ind2
            const code = regle.code
            const type = regle.type
            const message = regle.message


            let retour = findDataField(datafields,number,retour)
            console.log("retour : " , retour)
            // contrainte sur le number
            if(ind1 === "" && ind2 === "" && code ==="") {
                if(regle.type === "required") {
                    if(retour == null) {
                        resultJson.errors.push({
                            message: message,
                            number: number
                        });
                    } 
                } else if (regle.type === "not required") {
                    if(retour != null) {
                        resultJson.errors.push({
                            message: message,
                            number: number
                        });
                    } 
                }
            }
        });

    }
    return {
        testMatchStructurelRules: testMatchStructurelRules
    }
  }();
  
  module.exports = Structurel;
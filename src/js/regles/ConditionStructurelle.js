const Parcours = require("../utile/Parcours");
const Condition = require("../utile/Condition");
const axios = require('axios');
const convert = require("xml-js");


var ConditionStructurel = function () {

    var testConditionStrucutrelRules = function (rules, controlfields, datafields, resultJson) {
        rules.Generale.ConditionStructurel.forEach(function (regle) {
            //recuperation du field a testé
            var field1 = Parcours.findDataField(datafields, regle.number);
            //si c'est pas un datafield en cherche dans controllefield
            if (field1 == null){
                field1 = Parcours.findDataField(controlfields, regle.number);
            }
            //si on le field on check les conditions
            if (field1 != null){
                var checkedConds = true;
                regle.condition.forEach(function (condition) {
                    if(!Condition.checkCondition(controlfields ,datafields , condition)) {
                        checkedConds = false;
                    }
                });
                //si les conditions sont vrai
                if(checkedConds){
                    console.log("condition verifié");
                    //si les verification sont sur la notice reciproque
                    if(regle.reciproque){
                        var field = Parcours.findDataField(datafields, regle.reciproque.number);
                        var ppnDest = Parcours.getSubfieldValue(field , regle.reciproque.code);
                        axios.get("https://www.sudoc.fr/"+ppnDest+".xml")
                            .then(function (response) {
                                const data = JSON.parse(
                                    convert.xml2json(response.data, { compact: true, spaces: 2 })
                                );
                                if (!checkValues(regle, data.record.controlfield ,data.record.datafield)) {
                                    resultJson.errors.push({
                                        message: regle.message,
                                        number: regle.number,
                                    });
                                }

                            })
                            .catch(function (error) {
                                console.log("error matching reciproque");
                            })
                    }else{
                        //notice courante
                        if (!checkValues(regle, controlfields , datafields )){
                            resultJson.errors.push({
                                message: regle.message,
                                number: regle.number,
                            });
                        }
                    }
                }
            }

        });
    }

    function checkValues(regle, controlfields , datafields){

        var checkValues;
        if(regle.type.toString() === "allRequired"){
            checkValues = true;
            regle.value.forEach(function (v){
                if(v.code.toString() === "" && (Parcours.findDataField(datafields , v.number ) == null) === v.present){
                    checkValues = false;
                }else if(v.code.toString() !== ""){
                    const field = Parcours.findDataField(datafields, v.number);
                    const subfield = Parcours.getSubfieldValue(field , v.code);
                    if((subfield != null)  != v.present)
                        checkValues = false;
                    else if(v.reciproque){
                        checkReciproque(checkValues , Parcours.findDataField(controlfields, "001"), datafields, v.reciproque.number, v.reciproque.code, v.reciproque);
                    }
                }


            });

        }else if(regle.type.toString() === "oneRequired"){
            checkValues = false;
            regle.value.forEach(function (v){
                var field = Parcours.findDataField(datafields , v.number);
                if(v.code.toString() === "" && (Parcours.findDataField(datafields , v.number) != null) === v.present
                &&  ((v.ind1 && v.ind1 === field._attributes.ind1.toString().trim() && v.ind2 === field._attributes.ind2.toString().trim()) || !v.ind1)){
                    checkValues = true;
                }else if(v.code.toString() !== ""){
                    const f = Parcours.findDataField(datafields, v.number);
                    if((Parcours.getSubfieldValue(f , v.code) != null) === v.present )
                        checkValues = true;
                }else if(v.reciproque){
                    checkReciproque(checkValues , Parcours.findDataField(controlfields, "001"), datafields, v.reciproque.number, v.reciproque.code, v.reciproque);
                }

            });

        }

        return checkValues;

    }

    function  checkReciproque(isReciproque ,ppnSource, datafields,  number, code){
        var field = Parcours.findDataField(datafields, number);
        var ppnDest = Parcours.getSubfieldValue(field , code);
        if (ppnDest === null){
            isReciproque = false;
            return ;
        }

        axios.get("https://www.sudoc.fr/"+ppnDest+".xml")
            .then(function (response) {
                const data = JSON.parse(
                    convert.xml2json(response.data, { compact: true, spaces: 2 })
                );

                var field = Parcours.findDataField(data.record.datafield, number);
                if(field == null)
                    isReciproque = false;
                isReciproque = Parcours.getSubfieldValue(field , code) === ppnSource;
            })
            .catch(function (error) {
                isReciproque = false;
            })

    }

    return {
        testConditionStrucutrelRules : testConditionStrucutrelRules
    }
}();

module.exports = ConditionStructurel;
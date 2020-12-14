const Parcours = require("../utile/Parcours");

var Condition = function () {

    function checkCondition(controlefields, datafields, condition) {
        var field = null;

        if(condition.ind1 ||condition.ind2) {
            field = Parcours.findDataFieldById(datafields, condition.number, condition.ind1, condition.ind2);
        }
        else {
            field = Parcours.findDataField(datafields, condition.number);
        }

        if (field == null) {
            field = Parcours.findDataField(controlefields, condition.number);
        }


        if (field == null) {
              return false;
        }

        if (condition.operator === "presente") {
            if (condition.code.toString() !== "") {
                return Parcours.getSubfieldValue(field, condition.code) != null;
            }
        } else if (condition.operator === "not_presente") {
            if (condition.code.toString() !== "") {
                return !(Parcours.getSubfieldValue(field, condition.code) != null);
            }
        } else if (otherOperator(condition)) {
            if (condition.string.toString() !== "") {
                let subfieldValue;
                if (condition.code.toString() !== "") {
                    subfieldValue = Parcours.getSubfieldValue(field, condition.code);
                } else {
                    subfieldValue = field._text;
                }
                let isMatched = false;
                for(let i in condition.string) {
                    isMatched = testTagCondition(condition, subfieldValue, condition.string[i]);
                    if(isMatched) {
                        break
                    }
                }
                return isMatched;
            }
        } 
        return true;
    }
    return {
        checkCondition: checkCondition
    }
}();

module.exports = Condition;

function testTagCondition(condition, subfieldValue, item) {
    if (condition.operator === "contains_text" ) {
        return Parcours.slice(condition.pos[0], condition.pos[1], subfieldValue).includes(item.toString())
    } else if (condition.operator === "startwith_text") {
        return subfieldValue.trim().startsWith(item.toString())
    } else if (condition.operator === "equals_text") {
        return subfieldValue.trim() === item.toString()
    } else if (condition.operator === "not_equals_text") {
        return subfieldValue.trim() !== item.toString()
    }
    return false
}

function otherOperator(condition) {
    return condition.operator === "contains_text" || condition.operator === "startwith_text" ||
        condition.operator === "equals_text" || condition.operator === "not_equals_text";
}

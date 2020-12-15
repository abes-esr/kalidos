const Parcours = require("../utile/Parcours");

var Condition = function () {

    function checkCondition(controlefields, datafields, condition) {
        var fields = [];
        if (condition.ind1 || condition.ind2) {
            fields = Parcours.findDataFieldsById(datafields, condition.number, condition.ind1, condition.ind2);
        }
        else {
            fields = Parcours.findDataFields(datafields, condition.number);
        }

        if (fields.length == 0) {
            fields = Parcours.findDataFields(controlefields, condition.number);
        }

        if (fields.length == 0) {
            return condition.operator === "not_presente";
        }


        for (let i in fields) {

            if (condition.operator === "presente") {
                if (condition.code.toString() !== "") {
                    return Parcours.getSubfieldValue(fields[i], condition.code) != null;
                }
            } else if (condition.operator === "not_presente") {
                if (condition.code.toString() !== "") {
                    return Parcours.getSubfieldValue(fields[i], condition.code) == null;
                }
            } else if (otherOperator(condition)) {
                if (condition.string.toString() !== "") {
                    let subfieldValue;
                    if (condition.code.toString() !== "") {
                        subfieldValue = Parcours.getSubfieldValue(fields[i], condition.code);
                    } else {
                        subfieldValue = fields[i]._text;
                    }
                    let isMatched = false;
                    for (let j in condition.string) {
                        isMatched = testTagCondition(condition, subfieldValue, condition.string[j]);
                        if (isMatched) {
                            break;
                        }
                    }
                    return isMatched;
                }
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
    const subfieldPresent = subfieldValue != null;
    if (condition.operator === "contains_text") {
        return subfieldPresent && Parcours.slice(condition.pos[0], condition.pos[1], subfieldValue).includes(item.toString())
    } else if (condition.operator === "startwith_text") {
        return subfieldPresent && subfieldValue.trim().startsWith(item.toString())
    } else if (condition.operator === "equals_text") {
        return subfieldPresent && subfieldValue.trim() === item.toString()
    } else if (condition.operator === "not_equals_text") {
        return !subfieldPresent || subfieldValue.trim() !== item.toString()
    }
    return false
}

function otherOperator(condition) {
    return condition.operator === "contains_text" || condition.operator === "startwith_text" ||
        condition.operator === "equals_text" || condition.operator === "not_equals_text";
}

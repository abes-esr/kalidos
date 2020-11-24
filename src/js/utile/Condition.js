const Parcours = require("../utile/Parcours");

var Condition = function () {

    function checkCondition(controlefields, datafields, condition) {
        console.log("check");
        var field = Parcours.findDataField(datafields, condition.number);
        if (field == null)
            field = Parcours.findDataField(controlefields, condition.number);
        if (field == null || ((condition.ind1 && (condition.ind1 !== field._attributes.ind1.toString().trim() || condition.ind2 !== field._attributes.ind2.toString().trim())))) {
            return false;
        } else if (condition.operator === "presente") {
            if (condition.code.toString() !== "")
                return Parcours.getSubfieldValue(field, condition.code) != null;
        } else if (condition.operator === "not_presente") {
            if (condition.code.toString() !== "")
                return !(Parcours.getSubfieldValue(field, condition.code) != null);
        } else if (condition.operator === "contains_text" || condition.operator === "startwith_text" ||
            condition.operator === "equals_text" || condition.operator === "not_equals_text") {
            if (condition.string.toString() !== "") {
                var subfieldValue;
                if (condition.code.toString() !== "") {
                    subfieldValue = Parcours.getSubfieldValue(field, condition.code);
                } else {
                    subfieldValue = field._text;
                }
                var isMatched = false;
                condition.string.forEach((item) => {
                    if (condition.operator === "contains_text" && subfieldValue.substring(condition.pos[0], condition.pos[1]).includes(item.toString())) {
                        isMatched = true;
                    } else if (condition.operator === "startwith_text" && subfieldValue.startsWith(item.toString())) {
                        isMatched = true;
                    } else if (condition.operator === "equals_text" && subfieldValue === item.toString()) {
                        isMatched = true;
                    } else if (condition.operator === "not_equals_text" && subfieldValue !== item.toString()) {
                        isMatched = true;
                    }
                })
                return isMatched;
            }
        } else if (condition.operator.toString() === "equals") {
            if (condition.ind1.toString() !== "")
                return field._attributes.ind1.toString() === condition.ind1.toString();
            else if (condition.ind2.toString() !== "")
                return field._attributes.ind2.toString() === condition.ind2.toString();
        }

        return true;

    }
    return {
        checkCondition: checkCondition
    }
}();

module.exports = Condition;
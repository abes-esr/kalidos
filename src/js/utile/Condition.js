import Parcours from "../utile/Parcours";

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
                } else return false;
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
                        // if(subfieldValue === "a a 000yy") {
                        //     console.log("toto");
                        // }
                        isMatched = testTagCondition(condition, subfieldValue, condition.string[j]);
                        // console.log(subfieldValue,condition.operator, condition.string[j], isMatched);

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

// module.exports = Condition;
export default Condition;

/**
 * retourne une sous-chaine a partir de la fin
 * @param {json} condition condition de la regle
 * @param {String} subfieldValue valeur du subfield
 */
function compteFromEnd(condition , subfieldValue) {
    if(condition.pos.length === 1) {
        const retrait = condition.pos[0];
        const sousChaine = subfieldValue.slice(subfieldValue.length - retrait,subfieldValue.length - retrait + 1)
        return sousChaine.includes(condition.string[0].toString()); 
    }
    return false
}

/**
 * Applique un test en fonction du tag de la regle
 * @param {json} condition condition de la regle
 * @param {String} subfieldValue valeur du subfield
 * @param {String} item chaine de charactere a comparer
 */
function testTagCondition(condition, subfieldValue, item) {
    const subfieldPresent = subfieldValue != null;
    if (condition.operator === "contains_text") {
        return subfieldPresent && Parcours.slice(condition.pos[0], condition.pos[1], subfieldValue).includes(item.toString());
    } else if (condition.operator === "startwith_text") {
        return subfieldPresent && subfieldValue.trim().startsWith(item.toString());
    } else if (condition.operator === "equals_text") {
        return subfieldPresent && subfieldValue.trim() === item.toString();
    } else if (condition.operator === "not_equals_text") {
        return !subfieldPresent || subfieldValue.trim() !== item.toString();
    }else if (condition.operator === "not_startwith_text") {
        return !subfieldPresent || !subfieldValue.trim().startsWith(item.toString());
    } else if (condition.operator === 'not_contains_text') {
        return !subfieldPresent || !Parcours.slice(condition.pos[0], condition.pos[1], subfieldValue).includes(item.toString());
    } else if (condition.operator === 'count_from_end') { 
        return subfieldPresent && compteFromEnd(condition , subfieldValue)
    }
    return false
}

/**
 * liste d'operateur
 * @param {json} condition condition de la regle
 */
function otherOperator(condition) {
    return condition.operator === "contains_text" || condition.operator === "startwith_text" ||
        condition.operator === "equals_text" || condition.operator === "not_equals_text" || condition.operator === "not_startwith_text" 
        || condition.operator === 'not_contains_text' || condition.operator === 'count_from_end';
}

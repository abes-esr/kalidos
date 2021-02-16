import store from '../../store/index';
import { incrementeSynchro } from '../../actions/index';


var Parcours = function () {

    /**
     * Retourne un champ de notice
     * @param {*} datafields 
     * @param {*} number 
     */
    const findDataField = function (datafields, number) {
        let retour = null
        datafields.forEach(function (field) {
            if (field._attributes.tag == number) {
                retour = field
                return field
            }
        });
        return retour;
    }

    const findDataFieldById = function (datafields, number , ind1 , ind2) {
        let retour = null
        datafields.forEach(function (field) {
            if (field._attributes.tag == number && field._attributes.ind1.toString().trim() === ind1
                && field._attributes.ind2.toString().trim() === ind2) {
                retour = field
                return field
            }
        });

        return retour;
    }

    const findDataFieldsById = function (datafields, number , ind1 , ind2) {
        let retour = []
        // let count = 0;
        datafields.forEach(function (field) {
            if (field._attributes.tag == number && field._attributes.ind1.toString().trim() === ind1
                && field._attributes.ind2.toString().trim() === ind2) {
                retour.push(field)
            }
        });
        return retour;
    }


    const findDataFields = function (datafields, number) {
        let retour = []
        let count = 0;
        datafields.forEach(function (field) {
            if (field._attributes.tag == number) {
                field.num = count
                retour.push(field)
                count ++
            }
        });
        return retour;
    }

    const filterDatafield = function(datafields,variable, value) {
        let retour = [];
        for(let i in datafields) {
            // let tutu = datafields[i]._attributes[variable];
            if(datafields[i]._attributes[variable] === value) {
                retour.push(datafields[i])
            }
        }
        return retour;
    }

    const getAllDatafieldVerifyZone = function(datafields , number , code) {
        let retour  = [];
        const fields = findDataFields(datafields, number);
        for(let i in fields) {
            for(let j in fields[i].subfield) {
                if(fields[i].subfield[j]._attributes.code === code) {
                    retour.push(fields[i]);
                    break;
                }
            }
            
        }
        return retour;

    }


    /**
     * retourne la valeur d'un champ d'une notice
     * @param {*} field 
     * @param {*} code 
     */
    const getSubfieldValue = function(field,code) {
        if (field != null && field.subfield instanceof Array) {
            for (let i in field.subfield) {
                if(field.subfield[i]._attributes.code === code) {
                    return field.subfield[i]._text
                }
            }
        }else if (field != null) {
            if (field.subfield._attributes.code === code) {
                return field.subfield._text

            }
        } 
       
        return null
    }


    const getListSubfieldValue = function(fields,code) {
        let retour = [];
        for (let i in fields ) {
            if (fields[i] != null && fields[i].subfield instanceof Array) {
                for (let j in fields[i].subfield) {
                    if(fields[i].subfield[j]._attributes.code === code) {
                        retour.push(fields[i].subfield[j]);
                    }
                }
            }else if (fields[i] != null) {
                if (fields[i].subfield._attributes.code === code) {
                    retour.push(fields[i].subfield);
                }
            } 
        }
        return retour;
    }




    const getIdentifiantValue = function(field,codeCondition,codeIdentifiant) {
        let retour = null;
        if (field != null && field.subfield instanceof Array) {
            for (let i in field.subfield) {
                if(field.subfield[i]._attributes.code === codeIdentifiant) {
                    retour =  field.subfield[i]._text
                }
                if(field.subfield[i]._attributes.code === codeCondition && retour != null) { 
                    return retour
                }
            }
        }else if (field != null) {
            if (field.subfield._attributes.code === codeIdentifiant) {
                return field.subfield._text
            }
        } 
        return null
    }

    const testCode = function(field,code) {
        if (field != null && field.subfield instanceof Array) {
            for (let i in field.subfield) {
                if(field.subfield[i]._attributes.code === code) {
                    return true
                }
            }
        }else if (field != null) {
            if (field.subfield._attributes.code === code) {
                return true

            }
        } 
        return false
    }

    /**
     * retourne la liste des Categories de regles (General ,Electronique , ...)
     * @param {*} regles 
     */
    const getCategories = function (regles) {
        let catagorie = []
        for(item in regles) {
            catagorie.push(item)
        }
        return catagorie
    }

    /**
     * Retourne la liste des types de regles (matching, structurel ,...)
     * @param {*} regles 
     */
    const getTypes = function (regles) {
        let types = []
        for(item in regles) {
            for( regle in regles[item]) {
                types.push(regle)
            }
            break;
        }
        return types
    }

    const slice = function (start, end, text){
        return text.slice(start > 0 ? start -1  : 0, end);
    }

    //Ne sert que pour synchroniser les données et la vue à cause des requêtes axios
    const addErrorSynchro = function() {
        if(store !== undefined) {
            store.dispatch(incrementeSynchro("toto"));
        }
    }

    return {
        addErrorSynchro:addErrorSynchro,
        findDataField: findDataField,
        getSubfieldValue:getSubfieldValue,
        getCategories : getCategories,
        getTypes : getTypes,
        testCode : testCode,
        getIdentifiantValue : getIdentifiantValue,
        findDataFields : findDataFields,
        slice : slice,
        findDataFieldById : findDataFieldById,
        filterDatafield : filterDatafield, 
        findDataFieldsById : findDataFieldsById,
        getAllDatafieldVerifyZone : getAllDatafieldVerifyZone,
        getListSubfieldValue : getListSubfieldValue
    }
}();

// module.exports = Parcours;
export default Parcours;
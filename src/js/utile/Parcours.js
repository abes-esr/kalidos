import store from '../../store/index';
import { incrementeSynchro } from '../../actions/index';


var Parcours = function () {

    /**
     * Retourne un champ de notice.
     * @param {json} datafields zone de données
     * @param {String} number identifiant du datafield
     */
    const findDataField = function (datafields, number) {
        let retour = null;
        datafields.forEach(function (field) {
            if (field._attributes.tag == number) {
                retour = field;
                return field;
            }
        });
        return retour;
    }

    /**
     * Récupère un datafield ayant les caractéristiques passées en paramètre, s"il existe.
     * @param {json} datafields zone de données
     * @param {String} number identifiant
     * @param {String} ind1 valeur de l'ind1
     * @param {String} ind2 valeur de l'ind2
     */
    const findDataFieldById = function (datafields, number , ind1 , ind2) {
        let retour = null;
        datafields.forEach(function (field) {
            if (field._attributes.tag == number && field._attributes.ind1.toString().trim() === ind1
                && field._attributes.ind2.toString().trim() === ind2) {
                retour = field;
                return field;
            }
        });
        return retour;
    }

    /**
     * Retourne tous les datafield ayant les caractéristiques passées en paramètre s'ils existent.
     * @param {json} datafields zone de données
     * @param {String} number identifiant
     * @param {String} ind1 valeur de l'ind1
     * @param {String} ind2 valeur de l'ind2
     */
    const findDataFieldsById = function (datafields, number , ind1 , ind2) {
        let retour = [];
        // let count = 0;
        datafields.forEach(function (field) {
            if (field._attributes.tag == number && field._attributes.ind1.toString().trim() === ind1
                && field._attributes.ind2.toString().trim() === ind2) {
                retour.push(field);
            }
        });
        return retour;
    }

    /**
     * Retourne tous les datafield ayant le number passés en parametre s'ils existent.
     * @param {json} datafields zone de données
     * @param {String} number identifiant
     */
    const findDataFields = function (datafields, number) {
        let retour = [];
        let count = 0;
        datafields.forEach(function (field) {
            if (field._attributes.tag == number) {
                field.num = count;
                retour.push(field);
                count ++;
            }
        });
        return retour;
    }

    /**
     * Filtre les datafield par la valeur de la variable.
     * @param {json} datafields 
     * @param {String} variable variable filtre
     * @param {String} value valeur de la variable
     */
    const filterDatafield = function(datafields,variable, value) {
        let retour = [];
        for (let i in datafields) {
            // let tutu = datafields[i]._attributes[variable];
            if (datafields[i]._attributes[variable] === value) {
                retour.push(datafields[i]);
            }
        }
        return retour;
    }

    /**
     * Récupère une liste de subfield contenu dans une liste de datafield qui valident une valeur de code.
     * @param {json} datafields zone de données
     * @param {String} number identifiant des datafields
     * @param {String} code code à matcher pour les subfields
     */
    const getAllDatafieldVerifyZone = function(datafields, number, code) {
        let retour  = [];
        const fields = findDataFields(datafields, number);
        for (let i in fields) {
            for (let j in fields[i].subfield) {
                if (fields[i].subfield[j]._attributes.code === code) {
                    retour.push(fields[i]);
                    break;
                }
            } 
        }
        return retour;
    }


    /**
     * Retourne la valeur d'un champ d'une notice.
     * @param {json} field liste de datafield
     * @param {String} code code à matcher
     */
    const getSubfieldValue = function(field, code) {
        if (field != null && field.subfield instanceof Array) {
            for (let i in field.subfield) {
                if(field.subfield[i]._attributes.code === code) {
                    return field.subfield[i]._text;
                }
            }
        } else if (field != null) {
            if (field.subfield._attributes.code === code) {
                return field.subfield._text;
            }
        }
        return null;
    }


    /**
     * Récupère une liste de subfield selon une valeur de code.
     * @param {json} fields liste de datafield
     * @param {String} code code à matcher
     */
    const getListSubfieldValue = function(fields,code) {
        let retour = [];
        for (let i in fields ) {
            if (fields[i] != null && fields[i].subfield instanceof Array) {
                for (let j in fields[i].subfield) {
                    if (fields[i].subfield[j]._attributes.code === code) {
                        retour.push(fields[i].subfield[j]);
                    }
                }
            } else if (fields[i] != null) {
                if (fields[i].subfield._attributes.code === code) {
                    retour.push(fields[i].subfield);
                }
            } 
        }
        return retour;
    }


    /**
     * Récupère les subfields qui valident le codeCondition et le codeIdentifiant.
     * @param {json} field list de datafield
     * @param {String} codeCondition code à matcher
     * @param {String} codeIdentifiant code à matcher
     */
    const getIdentifiantValue = function(field,codeCondition,codeIdentifiant) {
        let retour = null;
        if (field != null && field.subfield instanceof Array) {
            for (let i in field.subfield) {
                if (field.subfield[i]._attributes.code === codeIdentifiant) {
                    retour = field.subfield[i]._text;
                }
                if (field.subfield[i]._attributes.code === codeCondition && retour != null) { 
                    return retour;
                }
            }
        } else if (field != null) {
            if (field.subfield._attributes.code === codeIdentifiant) {
                return field.subfield._text;
            }
        } 
        return null;
    }

    /**
     * Teste si un subfield avec une valeur de code donné existe.
     * @param {json} field datafield à tester
     * @param {String} code code à tester
     */
    const testCode = function(field,code) {
        if (field != null && field.subfield instanceof Array) {
            for (let i in field.subfield) {
                if (field.subfield[i]._attributes.code === code) {
                    return true;
                }
            }
        } else if (field != null) {
            if (field.subfield._attributes.code === code) {
                return true;
            }
        } 
        return false;
    }

    /**
     * Retourne la liste des Catégories de règles (General ,Electronique , ...).
     * @param {json} regles fichier de règles
     */
    const getCategories = function (regles) {
        let catagorie = [];
        for (item in regles) {
            catagorie.push(item);
        }
        return catagorie;
    }

    /**
     * Retourne la liste des types de règles (matching, structurel ,...).
     * @param {json} regles fichier de règles
     */
    const getTypes = function (regles) {
        let types = [];
        for (item in regles) {
            for (regle in regles[item]) {
                types.push(regle);
            }
            break;
        }
        return types;
    }

    /**
     * Découpe une chaîne de caractères.
     * @param {*} start début
     * @param {*} end fin
     * @param {*} text texte à decouper
     */
    const slice = function (start, end, text) {
        return text.slice(start > 0 ? start -1  : 0, end);
    }

    /**
     * Permet la synchronisation de l'interface de vérification des resultats.
     */
    const addErrorSynchro = function() {
        if (store !== undefined) {
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
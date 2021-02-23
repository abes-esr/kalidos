const axios = require('axios');
const convert = require("xml-js");
import { cleanResult, addErrorPPN, setNombreTotalPPN, setChoixCategorie, addErrorPPNErronnee } from '../../actions/index';
import store from '../../store/index';
import Parcours from "../utile/Parcours";
import Matching from "../regles/Matching";
import Structurel from "../regles/Structurel";
import Dependance from "../regles/Dependance";
import IdRef from "../regles/IdRef";
import ConditionStructurel from "../regles/ConditionStructurelle";
import ConditionMatching from "../regles/ConditionMatching";
import ConditionDependance from "../regles/ConditionDependance";
import Ordonnancement from "../regles/Ordonnancement";
import Compte from "../regles/Compte";
import Precedence from "../regles/Precedence";


const CATEGORIE_GENERALE = "Generale";

/**
 * Permet de vérifier le PPN en le tapant dans le formulaire.
 */
function verifiyRulesByTextArea() {
    store.dispatch(cleanResult());
    const choixCategorie = $("#choixCategorie").val();
    store.dispatch(setChoixCategorie(choixCategorie));
    window.location += 'interfaceVerif';
    const listPPN = document.getElementById("textAreaSaisie").value.split("\n").filter(x => x != '');
    store.dispatch(setNombreTotalPPN(listPPN.length));
    getRules(listPPN);
}

function verifiyRulesByTextAreaNotice (listPPN) {
    store.dispatch(cleanResult());
    const choixCategorie = $("#choixCategorie").val();
    store.dispatch(setChoixCategorie(choixCategorie));
    let path = location.protocol + '//' + location.host + '/#/interfaceVerif';
    window.location = path;
    store.dispatch(setNombreTotalPPN(listPPN.length));
    getRules(listPPN);
}


/**
 * Récupére un PPN dans la base du sudoc et lance sa vérification.
 * @param {json} rules règles à valider 
 * @param {string} PPN identifiant du PPN
 */
function getSudoc(rules, PPN) {
    axios.get('https://www.sudoc.fr/' + PPN + '.xml')
        .then(function (response) {
            const xml = response.data.replaceAll('&', '')
            const data = JSON.parse(
                convert.xml2json(xml, { compact: true, spaces: 2 })     
            );
            verifMain(rules, data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            store.dispatch(addErrorPPNErronnee(PPN));
        })
        .then(function () {
            // always executed
        });
}

/**
 * Ecrit les résultats de la vérification des règles dans un fichier json sur le serveur.
 */
function writeResult() {
    axios({
        method: 'POST',
        url: '/result',
        contentType: "application/json",
        headers: {
            "Accept": "application/json",
        },
        data: store.getState().result,
    }).then(function () {
        //console.log("ok")
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
    });
}

/**
 * Supprime une règle sur le serveur.
 * @param {int} index identifiant de la règle à supprimer
 */
function deleteRule(index) {
    axios({
        method: 'DELETE',
        url: '/rules',
        contentType: "application/json",
        headers: {
            "Accept": "application/json",
            "index": index,
        },
    }).then(function () {
        console.log("suppression ok")
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
    });
}


/**
 * Permet de mettre à jour une règle sur le serveur.
 * @param {int} index identifiant de la règle à modifier
 * @param {json} newRule règle mise à jour
 */
function updateRule(index, newRule) {
    axios.put('/rules', newRule, {
        headers: {
            'Content-Type': 'application/json',
            "index": index
        }
    }).then(function () {
        console.log("modification ok")
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 * Ajoute une nouvelle règle sur le serveur.
 * @param {string} categorie nom de la catégorie ou ajouter la règle
 * @param {string} type nom du type de la règle
 * @param {json} rule regle à ajouter
 */
function addRule(categorie, type, rule) {
    axios({
        method: 'POST',
        url: '/rules',
        contentType: "application/json",
        headers: {
            "Accept": "application/json",
            "categorie": categorie,
            "type": type
        },
        data: rule,
    }).then(function () {
        console.log("ok")
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
    });
}

/**
 * Récupère la liste des règles sur le serveur et lance la vérification pour tous les PPN.
 * @param {List<String>} listPPN 
 */
function getRules(listPPN) {
    axios.get('/rules')
        .then(function (response) {

            listPPN.forEach(PPN => getSudoc(response.data, PPN.trim()));
            // getSudoc(response.data,'169450546');
            writeResult();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

/**
 * Récupère la notice et l'envoie sur le serveur.
 * @param {Array.<string>} errorIndex liste des PPN erronés 
 */
function addNoticeErreurs(errorIndex) {
    axios({
        method: 'POST',
        url: '/notices',
        contentType: "application/json",
        headers: {
            "Accept": "application/json",
        },
        data: errorIndex,
        port: 3000,
    }).then(function () {

    }).catch(function (error) {
        console.log(error);
    }).then(function () {
        // always executed
    });
}


/**
 * Crée une nouvelle notice avec les PPN erronés.
 */
function noticeErreurs () {
    const json = store.getState().result;
    const data_verif = Object.keys(json).map((key) => [Number(key), json[key]]);
    const listPPNWithError = data_verif.filter((row) => { return row[1].errors.length });
    
    let errorIndex = [];
    for (let i = 0; i < listPPNWithError.length; i++) {
        errorIndex.push(listPPNWithError[i][1]['PPN']);
    }
    addNoticeErreurs(errorIndex);
}

/**
 * Retourne la bibliothèque prioritaire parmi une liste de bibliothèques.
 * @param {Array} biblio liste de bibliothèques
 */
function prioBiblio (biblios) {
    let prio = {};
    // on boucle pour connaître les priorités et on les stocke dans prio
    for (let i = 0; i < biblios.length; i++) {
        const bib_txt = biblios[i]._text;
        switch (bib_txt) {
            case '692662101':
                return bib_txt;
            case '693882101':
                prio[bib_txt] = 2;
                break;
            case '692669902':
                prio[bib_txt] = 3;
                break;
            case '693842301':
                prio[bib_txt] = 4;
                break;
            case '693882213':
                prio[bib_txt] = 5;
                break;
            case '692662209':
                prio[bib_txt] = 6;
                break;
            case '692662214':
                prio[bib_txt] = 7;
                break;
            case '010532202':
                prio[bib_txt] = 8;
                break;
            case '693872104':
                prio[bib_txt] = 9;
                break;
            case '010532301':
                prio[bib_txt] = 10;
                break;
            case '692662208':
                prio[bib_txt] = 11;
                break;
            case '692042202':
                prio[bib_txt] = 12;
                break;
            case '692662217':
                prio[bib_txt] = 13;
                break;
            case '422182310':
                prio[bib_txt] = 14;
                break;
            default:
                break;      
        }
    }
    
    if (prio == "{}")
        return biblios[0]._text;
    // si aucunes des biblios ne correspondent à une biblio de la liste des priorités
    // alors on renvoie la première biblio
        
    // on compare les priorités stockées dans prio et on retourne la bibliothèque prioritaire
    const prio_tab = Object.keys(prio).map((key) => [String(key), prio[key]]);
    let max_prio = prio_tab[0][0];
    for (let i = 1; i < prio_tab.length; i++) {
        if (prio_tab[i][1] < prio_tab[i-1][1])
            max_prio = prio_tab[i][0];
    }
    return max_prio;
}

/**
 * Retourne la bibliothèque d'un PPN.
 * @param {json} datafields datafields du PPN 
 */
function getBiblio (datafields) {
    //les bilbios se retrouvent dans le champ 930$b
    let fields = Parcours.findDataFields(datafields, 930);
    let biblios = Parcours.getListSubfieldValue(fields, "b");

    let bib = "";
    if (biblios.length > 0)
        bib = prioBiblio(biblios);
    else
        bib = biblios[0]._text;
    return bib;
}

/**
 * Lance la vérification du jeu de règles sur un sudoc.
 * @param {json} rules jeu de règle
 * @param {xml} sudoc document à vérifier
 */
function verifMain(rules, sudoc) {

    // const leader = sudoc.record.leader;
    const controlfields = sudoc.record.controlfield;
    const datafields = sudoc.record.datafield;
    const categorieChoose = store.getState().choixCategorie;
    let resultJson = {
        PPN: controlfields[0]._text,
        errors: [],
    };

    const getNoticeStructurelle = ConditionStructurel.getDataOnSudoc;
    const getNoticeSMatching = ConditionMatching.getDataOnSudoc;

    testOnCategorie(CATEGORIE_GENERALE, rules, controlfields, datafields, resultJson, getNoticeStructurelle, getNoticeSMatching);
    if (categorieChoose != CATEGORIE_GENERALE) {
        testOnCategorie(categorieChoose, rules, controlfields, datafields, resultJson, getNoticeStructurelle, getNoticeSMatching);
    }

    let bib = getBiblio(datafields);
    resultJson["biblio"] = bib;

    store.dispatch(addErrorPPN(resultJson));

    if (store.getState().compteurResult === store.getState().nombreTotalPPN) {
        noticeErreurs();  
    }
}

export {verifiyRulesByTextArea, verifiyRulesByTextAreaNotice};

/**
 * Teste tous les type de règle sur un PPN.
 * @param {string} categorie nom de la catégorie de règle à appliquer
 * @param {json} rules fichier de règles
 * @param {json} controlfields zone de controle du sudoc
 * @param {json} datafields zone de données du sudoc
 * @param {json} resultJson fichier de résultat
 * @param {function} getNoticeStructurelle fonction pour récupérer une notice sur le sudoc
 * @param {function} getNoticeSMatching fonction pour récupérer une notice sur le sudoc
 */
function testOnCategorie(categorie, rules, controlfields, datafields, resultJson, getNoticeStructurelle, getNoticeSMatching) {
    Matching.testMatchRegexRules(categorie, rules, controlfields, datafields, resultJson);
    Structurel.testMatchStructurelRules(categorie, rules, controlfields, datafields, resultJson);
    Dependance.testMatchDependanceRules(categorie, rules, controlfields, datafields, resultJson);
    IdRef.testIdRefRules(categorie, rules, controlfields, datafields, resultJson);
    ConditionStructurel.testConditionStrucutrelRules(categorie, rules, controlfields, datafields, resultJson, getNoticeStructurelle);
    ConditionMatching.testConditionMatchingRules(categorie, rules, controlfields, datafields, resultJson, getNoticeSMatching);
    ConditionDependance.testConditionDependanceRules(categorie, rules, controlfields, datafields, resultJson);
    Ordonnancement.testOrdonnancementRules(categorie, rules, controlfields, datafields, resultJson);
    Compte.testCompteRules(categorie, rules, controlfields, datafields, resultJson);
    Precedence.testPrecedenceRules(categorie, rules, controlfields, datafields, resultJson);
}


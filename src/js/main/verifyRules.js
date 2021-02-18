const axios = require('axios');
const convert = require("xml-js");
import { cleanResult, addErrorPPN, setNombreTotalPPN, setChoixCategorie, addErrorPPNErronnee } from '../../actions/index';
import store from '../../store/index';
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
import { WindowSidebar } from 'react-bootstrap-icons';


const CATEGORIE_GENERALE = "Generale";

let nombreTotalPPN = 0;
let count = 0;

/**
 * Permet de verifier le PPN en le tapant dans le formulaire
 */
function verifiyRulesByTextArea() {
    store.dispatch(cleanResult());
    const choixCategorie = $("#choixCategorie").val();
    store.dispatch(setChoixCategorie(choixCategorie));
    window.location += 'interfaceVerif';
    const listPPN = document.getElementById("textAreaSaisie").value.split("\n").filter(x => x != '');
    store.dispatch(setNombreTotalPPN(listPPN.length));
    nombreTotalPPN = listPPN.length;
    count = 0;
    getRules(listPPN);
}

/**
 * recuperer un PPN dans la base du sudoc et lance sa verification
 * @param {json} rules regles a valider 
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
 * ecris les resultats de la verification des regles dans un fichier json sur le serveur
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
 * supprime une regle sur le serveur
 * @param {int} index identifiant de la regle a supprimer
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
 * permet de mettre a jour une regle sur le serveur
 * @param {int} index identifiant de la regle a modifier
 * @param {json} newRule regle mise a jour
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
 * ajoute une nouvelle regle sur le serveur
 * @param {string} categorie nom de la categorie ou ajouter la regle
 * @param {string} type nom du type de la regle
 * @param {json} rule regle a ajouter
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
 * recupere la liste des regles sur le serveur et lance la verification pour tous les PPN
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



function noticeErreurs(){
    const json = store.getState().result;
    const data_verif = Object.keys(json).map((key) => [Number(key), json[key]]);
    const listPPNWithError = data_verif.filter((row) => { return row[1].errors.length });
    
    let errorIndex = [];
    for (let i = 0; i < listPPNWithError.length; i++) {
        errorIndex.push(listPPNWithError[i][1]['PPN']);
    }
    addNoticeErreurs(errorIndex);
}

function addNoticeErreurs(errorIndex) {
    axios({
        method: 'POST',
        url: '/notice',
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
 * lance la verification du jeu de regle sur un sudoc
 * @param {json} rules jeu de regle
 * @param {xml} sudoc document a verifier
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

    store.dispatch(addErrorPPN(resultJson));

    count++;
    if (count === nombreTotalPPN) {
        noticeErreurs();  
    }
}

export {verifiyRulesByTextArea};

/**
 * Teste tous les type de regle sur un PPN
 * @param {string} categorie nom de la categorie de regle a appliquer
 * @param {json} rules fichier de regles
 * @param {json} controlfields zone de controle du sudoc
 * @param {json} datafields zone de données du sudoc
 * @param {json} resultJson fichier de resultat
 * @param {function} getNoticeStructurelle fonction pour recuperer une notice sur le sudoc
 * @param {function} getNoticeSMatching fonction pour recuperer une notice sur le sudoc
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


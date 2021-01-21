const axios = require('axios');
const convert = require("xml-js");
import { cleanResult, addErrorPPN, setNombreTotalPPN } from '../../actions/index';
import store from '../../store/index';
const Matching = require("../regles/Matching");
const Structurel = require("../regles/Structurel");
const Dependance = require("../regles/Dependance");
const IdRef = require("../regles/IdRef");
import ConditionStructurel from "../regles/ConditionStructurelle";
import ConditionMatching from "../regles/ConditionMatching";
const ConditionDependance = require("../regles/ConditionDependance");
const Ordonnancement = require('../regles/Ordonnancement');
const Compte = require('../regles/Compte');

const PPN_EN_DUR = '169450546'
const CATEGORIE = "Generale";
const TYPE = "matching";
const NEWRULE = {
    "number": 404,
    "code": "z",
    "message": "NEW RULE",
    "regex": "[A-Z]*[a-z]+"
}

const NEWRULEMODIFIED = {
    "number": 404,
    "code": "z",
    "message": "NEW RULE MODIFIED",
    "regex": "[A-Z]*[a-z]+"
};
const INDEX = 5;
const REGEXENDUR = ".*^(NOM).*";

let nombreTotalPPN = 0;
let count = 0;

function verifiyRulesByTextArea() {
    store.dispatch(cleanResult());
    window.location += 'interfaceVerif';
    const listPPN = document.getElementById("textAreaSaisie").value.split("\n").filter(x=>x!='');
    store.dispatch(setNombreTotalPPN(listPPN.length));
    nombreTotalPPN = listPPN.length;
    getRules(listPPN);
}

function verifyRules() {
    store.dispatch(cleanResult());
    window.location += 'tempInterfaceVerif';
    getRules();
}


function getSudoc(rules, PPN) {


    axios.get('https://www.sudoc.fr/' + PPN + '.xml')
        .then(function (response) {
            const data = JSON.parse(
                convert.xml2json(response.data, { compact: true, spaces: 2 })
            );
            verifMain(rules, data );
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

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

function noticesErreurs() {
    axios({
        method: 'POST',
        url: '/notice',
        contentType: "application/json",
        headers: {
            "Accept": "application/json",
        },
        data: store.getState().result,
        port: 3000,
    }).then(function () {

    }).catch(function (error) {
        console.log(error);
    }).then(function () {
        // always executed
    });
}

function verifMain(rules, sudoc) {

    // const leader = sudoc.record.leader;
    const controlfields = sudoc.record.controlfield;
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: controlfields[0]._text,
        errors: [],
    };

    const getNoticeStructurelle = ConditionStructurel.getDataOnSudoc;
    const getNoticeSMatching = ConditionMatching.getDataOnSudoc;

    Matching.testMatchRegexRules(CATEGORIE,rules,controlfields,datafields , resultJson)
    Structurel.testMatchStructurelRules(CATEGORIE,rules,controlfields,datafields , resultJson)
    Dependance.testMatchDependanceRules(CATEGORIE,rules,controlfields,datafields , resultJson)
    IdRef.testIdRefRules(CATEGORIE,rules,controlfields,datafields , resultJson)
    ConditionStructurel.testConditionStrucutrelRules(rules,controlfields,datafields , resultJson , getNoticeStructurelle)
    ConditionMatching.testConditionMatchingRules(rules,controlfields,datafields , resultJson , getNoticeSMatching)
    ConditionDependance.testConditionDependanceRules(rules,controlfields,datafields , resultJson)
    Ordonnancement.testOrdonnancementRules(CATEGORIE, rules, controlfields, datafields, resultJson)
    Compte.testCompteRules(CATEGORIE, rules, controlfields, datafields, resultJson)


    store.dispatch(addErrorPPN(resultJson));

    count++;
    if (count === nombreTotalPPN) {
        noticesErreurs();
    }

    //addRule(CATEGORIE,TYPE,NEWRULE)


    //addRule(CATEGORIE,TYPE,NEWRULE);
    //updateRule(INDEX,NEWRULEMODIFIED);
    //deleteRule(INDEX)
    //Regex.transform(REGEXENDUR,sudoc)
}

export { verifyRules, verifiyRulesByTextArea };

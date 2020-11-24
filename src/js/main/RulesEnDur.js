const axios = require('axios');
const convert = require("xml-js");
const Matching = require("../regles/Matching");
const Structurel = require("../regles/Structurel");
const Conditionnel = require("../regles/Conditionnel");
const Dependance = require("../regles/Dependance");
const IdRef = require("../regles/IdRef");


let result = {};

const PPN_EN_DUR = '192132741'
const CATEGORIE = "Generale";
const TYPE = "matching";
const NEWRULE = {
    "number": 404,
    "code": "z",
    "message": "NEW RULE",
    "regex": "[A-Z]*[a-z]+"
};

const NEWRULEMODIFIED = {
    "number": 404,
    "code": "z",
    "message": "NEW RULE MODIFIED",
    "regex": "[A-Z]*[a-z]+"
};
const INDEX = 5;
const REGEXENDUR = ".*^(NOM).*"


function verifyRules() {
    var rules = getRules(PPN_EN_DUR)
    var obj;
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
        url: 'http://localhost:3000/result',
        contentType: "application/json",
        headers: {
            "Accept": "application/json",
        },
        data: result,
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
        url: 'http://localhost:3000/rules',
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
    axios.put('http://localhost:3000/rules', newRule, {
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
        url: 'http://localhost:3000/rules',
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

function getRules(PPN) {
    axios.get('http://localhost:3000/rules')
        .then(function (response) {
            getSudoc(response.data, PPN);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

}

function verifMain(rules, sudoc ) {
    const leader = sudoc.record.leader;
    const controlfields = sudoc.record.controlfield;
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: controlfields[0]._text,
        errors: [],
    };



    // Matching.testMatchRegexRules(CATEGORIE,rules,controlfields,datafields , resultJson)
    // Structurel.testMatchStructurelRules(CATEGORIE,rules,controlfields,datafields , resultJson)
    // Dependance.testMatchDependanceRules(CATEGORIE,rules,controlfields,datafields , resultJson)
    IdRef.testIdRefRules(CATEGORIE,rules,controlfields,datafields , resultJson)

    console.log("result : " , resultJson)




    result[controlfields[0]._text] = resultJson;
    //console.log(result);
    writeResult();


    //addRule(CATEGORIE,TYPE,NEWRULE);
    //updateRule(INDEX,NEWRULEMODIFIED);
    //deleteRule(INDEX)
    //Regex.transform(REGEXENDUR,sudoc)
}

export default verifyRules;
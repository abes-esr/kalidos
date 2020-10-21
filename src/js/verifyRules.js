const axios = require('axios');
const convert = require("xml-js");
import { cleanResult, addErrorPPN } from '../actions/index';
import store from '../store/index';
const Regex = require("./Regex");

const PPN_EN_DUR = '169450546'
const CATEGORIE = "Generale";
const TYPE = "matching";
const NEWRULE = {
    "number": 404,
    "code": "z",
    "message": "NEW RULE",
    "regex": "[A-Z]*[a-z]+"
}

function verifyRulesByFile() {
    window.location += 'tempInterfaceVerif';
    let reader = new FileReader();
    reader.readAsText(window.fileListPPN);
    reader.onload = function () {
        const listPPN = reader.result.split("\n");
        getRules(listPPN);
    }
}

function verifiyRulesByTextArea() {
    store.dispatch(cleanResult());
    window.location += 'tempInterfaceVerif';
    const listPPN = document.getElementById("textAreaSaisie").value.split("\n");
    getRules(listPPN);
}

function verifyRules() {
    store.dispatch(cleanResult());
    window.location += 'tempInterfaceVerif';
    getRules();
}

const NEWRULEMODIFIED = {
    "number": 404,
    "code": "z",
    "message": "NEW RULE MODIFIED",
    "regex": "[A-Z]*[a-z]+"
};
const INDEX = 5;
const REGEXENDUR = ".*^(NOM).*";

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

function getRules(listPPN) {
    axios.get('http://localhost:3000/rules')
        .then(function (response) {

            listPPN.forEach(PPN => getSudoc(response.data, PPN));
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



function verifMain(rules, sudoc) {

    const leader = sudoc.record.leader;
    const controlfields = sudoc.record.controlfield;
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: controlfields[0]._text,
        errors: [],
    };


    rules.Generale.matching.forEach(function (regle) {
        const regex = RegExp(regle.regex);
        datafields.forEach(function (field) {

            if (field._attributes.tag.toString() === regle.number.toString() || regle.number === "GLOBAL") {
                if (field.subfield instanceof Array) {
                    field.subfield.forEach(function (subfield) {
                        if (subfield._attributes.code === regle.code || regle.number === "GLOBAL") {
                            if(!regex.test(subfield._text)) {
                                resultJson.errors.push({
                                    message: regle.message,
                                    number: regle.number,
                                    code: regle.code
                                });
                            }          
                        }
                    });
                } else {
                    if (field.subfield._attributes.code === regle.code || regle.number === "GLOBAL") {
                        if(!regex.test(field.subfield._text)) {
                            resultJson.errors.push({
                                message: regle.message,
                                number: regle.number,
                                code: regle.code
                            });
                        }

                    }
                }
            }
        });
    });

    store.dispatch(addErrorPPN(resultJson));
    //addRule(CATEGORIE,TYPE,NEWRULE)


    //addRule(CATEGORIE,TYPE,NEWRULE);
    //updateRule(INDEX,NEWRULEMODIFIED);
    //deleteRule(INDEX)
    //Regex.transform(REGEXENDUR,sudoc)
}

export { verifyRules, verifiyRulesByTextArea, verifyRulesByFile };
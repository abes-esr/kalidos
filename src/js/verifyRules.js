const axios = require('axios');
const convert = require("xml-js");
import { cleanResult, addErrorPPN } from '../actions/index';
import store from '../store/index';

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

function getSudoc(rules, PPN) {

    axios.get('https://www.sudoc.fr/' + PPN + '.xml')
        .then(function (response) {
            const data = JSON.parse(
                convert.xml2json(response.data, { compact: true, spaces: 2 })
            );
            verifMain(rules, data);
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
        console.log("ok")
    })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
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
            if (field._attributes.tag.toString() === regle.number.toString()) {
                field.subfield.forEach(function (subfield) {
                    if (subfield._attributes.code === regle.code && !regex.test(subfield._text)) {
                        resultJson.errors.push({
                            message: regle.message,
                            number: regle.number,
                            code: regle.code
                        });
                    }
                });
            }
        });
    });
    store.dispatch(addErrorPPN(resultJson));
    //addRule(CATEGORIE,TYPE,NEWRULE)

}

export { verifyRules, verifiyRulesByTextArea, verifyRulesByFile };
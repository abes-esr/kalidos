const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const Dependance = require("../regles/Dependance");
import rules from '../../../serveur/public/model_regles.json';

let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "dependances":[]
        }
    }
});

beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function getPPN(link) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'testPPN/Dependances/' + link), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

function addRuleToTest(numRuleExcell) {
    ruleTest[CATEGORIE].dependances.push(rules[CATEGORIE].dependances.find(x => x.numRuleExcell === numRuleExcell))
}



// ===============================================================

test('Dates incohérentes : vérifier les dates zone 100', () => {
    const number = 100;
    const numRuleExcell = 4;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Dependance.testMatchDependanceRules(CATEGORIE,ruleTest,undefined,datafields, resultJson);

    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Dates incohérentes : vérifier les dates zone 100 FAIL', () => {
    const number = 100;
    const numRuleExcell = 4;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Dependance.testMatchDependanceRules(CATEGORIE,ruleTest,undefined,datafields, resultJson);

    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test('Année de soutenance : l\'année en 029 et 328 doivent être identiques', () => {
    const number = '029';
    const numRuleExcell = 101;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Dependance.testMatchDependanceRules(CATEGORIE,ruleTest,undefined,datafields, resultJson);

    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Année de soutenance : l\'année en 029 et 328 doivent être identiques FAIL', () => {
    const number = '029';
    const numRuleExcell = 101;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Dependance.testMatchDependanceRules(CATEGORIE,ruleTest,undefined,datafields, resultJson);

    expect(resultJson.errors).not.toStrictEqual([]);
});

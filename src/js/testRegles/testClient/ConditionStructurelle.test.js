const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const ConditionStructurelle = require('../../regles/ConditionStructurelle');
import rules from '../../../../serveur/public/model_regles.json';

let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "ConditionStructurel": []
        }
    }
});

beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function addRuleToTest(index) {
    ruleTest[CATEGORIE].ConditionStructurel.push(rules[CATEGORIE].ConditionStructurel.find(x => x.index === index))
}

function getNotice(number) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'data/Notice' + number + '.xml'), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}


test("Si 101 ind1=1 il faut au moins un $a et $c", () => {
    const notice = "001"
    const index = 1025
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 101 ind1=1 il faut au moins un $a et $c (FAIL)", () => {
    const notice = "002"
    const index = 1025
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
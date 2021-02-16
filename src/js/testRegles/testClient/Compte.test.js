const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
import Compte from '../../regles/Compte';
import rules from '../../../../serveur/public/model_regles.json';

let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "compte": []
        }
    }
});

beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function getNotice(number) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'data/Notice' + number + '.xml'), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

function addRuleToTest(index) {
    ruleTest[CATEGORIE].compte.push(rules[CATEGORIE].compte.find(x => x.index === index))
}



test("Si plusieurs 101$d, il doit y avoir autant de 330", () => {
    const notice = "019"
    const index = 5007
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    Compte.testCompteRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si plusieurs 101$d, il doit y avoir autant de 330(FAIL)", () => {
    const notice = "020"
    const index = 5007
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    Compte.testCompteRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});
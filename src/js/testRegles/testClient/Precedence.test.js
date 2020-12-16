const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const Precedence = require('../../regles/Precedence');
import rules from '../../../../serveur/public/model_regles.json';

let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "precedence": []
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
    ruleTest[CATEGORIE].precedence.push(rules[CATEGORIE].precedence.find(x => x.index === index))
}


test("608 $a et $2rameau, $a doit être précédé d’un $3", () => {
    const notice = "003"
    const index = 5008
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    Precedence.testPrecedenceRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("608 $a et $2rameau, $a doit être précédé d’un $3 (FAIL)", () => {
    const notice = "004"
    const index = 5009
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    Precedence.testPrecedenceRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

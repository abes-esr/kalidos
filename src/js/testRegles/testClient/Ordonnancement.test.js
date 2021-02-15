const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
import Ordonnancement from '../../regles/Ordonnancement';
import rules from '../../../../serveur/public/model_regles.json';

let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "ordonnancement": []
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
    ruleTest[CATEGORIE].ordonnancement.push(rules[CATEGORIE].ordonnancement.find(x => x.index === index))
}



test("Si plusieurs zones 214, doivent respecter l'ordre des chiffres de l'ind2", () => {
    const notice = "031"
    const index = 5006
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    Ordonnancement.testOrdonnancementRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si plusieurs zones 214, doivent respecter l'ordre des chiffres de l'ind2 (FAIL)", () => {
    const notice = "032"
    const index = 5006
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    Ordonnancement.testOrdonnancementRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});
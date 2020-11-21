const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const Matching = require('../../regles/Matching');
import rules from '../../../../serveur/public/model_regles.json';



let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "matching":[]
        }
    }
});

beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function getNotice(number) {
    //const xmlPPN = fs.readFileSync(path.join(__dirname, 'data/notice' + numberNotice +'.xml'), 'utf8');
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'data/notice' + number + '.xml'), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

function addRuleToTest(numRuleExcell) {
    ruleTest[CATEGORIE].matching.push(rules[CATEGORIE].matching.find(x => x.numRuleExcell === numRuleExcell))
}



// ===============================================================

test('008 doit contenir "x3"', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const numRuleExcell = 2;
    addRuleToTest(numRuleExcell);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('008 doit contenir "x3" (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const numRuleExcell = 2;
    addRuleToTest(numRuleExcell);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});
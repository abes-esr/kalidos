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

function addRuleToTest(index) {
    ruleTest[CATEGORIE].matching.push(rules[CATEGORIE].matching.find(x => x.index === index))
}



// ===============================================================

test('008 doit contenir "x3"', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 71;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('008 doit contenir "x3" (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 71;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});




test('Zone 100 : langue de catalogage à corriger ', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 73;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});



test('Zone 100 : langue de catalogage à corriger (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 73;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


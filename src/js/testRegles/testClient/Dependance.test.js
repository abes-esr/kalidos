const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const Dependance = require('../../regles/Dependance');
import rules from '../../../../serveur/public/model_regles.json';


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

function getNotice(number) {
    //const xmlPPN = fs.readFileSync(path.join(__dirname, 'data/notice' + numberNotice +'.xml'), 'utf8');
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'data/notice' + number + '.xml'), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

function addRuleToTest(numRuleExcell) {
    ruleTest[CATEGORIE].dependances.push(rules[CATEGORIE].dependances.find(x => x.numRuleExcell === numRuleExcell))
}



test('100$a Pos. 9-12 = 214$d', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const numRuleExcell = 3;
    addRuleToTest(numRuleExcell);
    Dependance.testMatchDependanceRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('100$a Pos. 9-12 = 214$d (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const numRuleExcell = 3;
    addRuleToTest(numRuleExcell);
    Dependance.testMatchDependanceRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});
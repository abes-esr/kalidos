const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
import Dependance from '../../regles/Dependance';
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
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'data/Notice' + number + '.xml'), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

function addRuleToTest(index) {
    ruleTest[CATEGORIE].dependances.push(rules[CATEGORIE].dependances.find(x => x.index === index))
}

// =======================================================


test('100$a Pos. 9-12 = 214$d', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 72;
    addRuleToTest(index);
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
    const index = 72;
    addRuleToTest(index);
    Dependance.testMatchDependanceRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =======================================================

test('Dates incohérentes : vérifier les dates zone 100', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 2;
    addRuleToTest(index);
    Dependance.testMatchDependanceRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});


test('Dates incohérentes : vérifier les dates zone 100 (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 2;
    addRuleToTest(index);
    Dependance.testMatchDependanceRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =======================================================

test('Année de soutenance : l\'année en 029 et 328 doivent être identiques', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 43;
    addRuleToTest(index);
    Dependance.testMatchDependanceRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});


test('Année de soutenance : l\'année en 029 et 328 doivent être identiques (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 43;
    addRuleToTest(index);
    Dependance.testMatchDependanceRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});
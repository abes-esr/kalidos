const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
import Structurel from '../../regles/Structurel';
import rules from '../../../../serveur/public/model_regles.json';


let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "Structurel":[]
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
    ruleTest[CATEGORIE].Structurel.push(rules[CATEGORIE].Structurel.find(x => x.index === index))
}

// ===============================================

test('La notice doit contenir au moins une zone 181', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 29;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('La notice doit contenir au moins une zone 181 (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 29;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================

test('La notice doit contenir au moins une zone 182', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 30;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('La notice doit contenir au moins une zone 182 (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 30;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================

test('La notice doit contenir au moins une zone 183', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 31;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('La notice doit contenir au moins une zone 183 (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 31;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================

test('Zone 200$d : à remplacer par les zones 181, 182 et 183', () => {
    const notice = getNotice("003");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 44;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 200$d : à remplacer par les zones 181, 182 et 183 (FAIL)', () => {
    const notice = getNotice("004");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 44;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================

test('Zone 210 à remplacer par 214 (document en main)', () => {
    const notice = getNotice("003");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 45;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 210 à remplacer par 214 (document en main) (FAIL)', () => {
    const notice = getNotice("010");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 45;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================

test('Supprimer la zone 309 une fois la correction demandée effectuée', () => {
    const notice = getNotice("009");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 32;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('Supprimer la zone 309 une fois la correction demandée effectuée (FAIL)', () => {
    const notice = getNotice("010");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 32;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================

test('Mention d\'auteur obligatoire', () => {
    const notice = getNotice("013");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 33;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('Mention d\'auteur obligatoire (FAIL)', () => {
    const notice = getNotice("014");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 33;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================

test('Zones 7XX : lier à une notice d\'autorité', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 34;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('Zones 7XX : lier à une notice d\'autorité (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 34;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================

test('Zone 328 : revoir la valeur des indicateurs', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 46;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 328 : revoir la valeur des indicateurs (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 46;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================

test('Zone 455 incompatible avec le type de thèse (soutenance)', () => {
    const notice = getNotice("021");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 48;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 455 incompatible avec le type de thèse (soutenance) (FAIL)', () => {
    const notice = getNotice("022");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 48;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================

test('Ressource électronique : doit contenir une zone 303', () => {
    const notice = getNotice("045");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 50;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('Ressource électronique : doit contenir une zone 303 (FAIL)', () => {
    const notice = getNotice("046");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 50;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================

test('Ressource électronique : doit contenir une zone 339', () => {
    const notice = getNotice("045");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 51;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('Ressource électronique : doit contenir une zone 339 (FAIL)', () => {
    const notice = getNotice("046");
    const datafields = notice.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 51;
    addRuleToTest(index);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});
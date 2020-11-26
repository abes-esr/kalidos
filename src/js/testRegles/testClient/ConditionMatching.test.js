const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const ConditionMatching = require('../../regles/ConditionMatching');
import rules from '../../../../serveur/public/model_regles.json';

let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "ConditionMatching": []
        }
    }
});

beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function addRuleToTest(index) {
    ruleTest[CATEGORIE].ConditionMatching.push(rules[CATEGORIE].ConditionMatching.find(x => x.index === index))
}

function getNotice(number) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'data/Notice' + number + '.xml'), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

//Red
test("Si  105 $a Pos. 0-3 différent de la valeur \"y\" alors 215$c ne doit pas être vide", () => {
    const notice = "005"
    const index = 1000
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si  105 $a Pos. 0-3 différent de la valeur \"y\" alors 215$c ne doit pas être vide (FAIL)", () => {
    const notice = "006"
    const index = 1000
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
test("Si 105 $a Pos. 8 = 1 alors il faut aussi une 608 $302886431X $aActes de congrès", () => {
    const notice = "033"
    const index = 1001
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 8 = 1 alors il faut aussi une 608 $302886431X $aActes de congrès (FAIL)", () => {
    const notice = "034"
    const index = 1001
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
test("Si 105 $a Pos. 8 = 0 alors il ne doit pas y avoir 608 $302886431X ou $aActes de congrès", () => {
    const notice = "007"
    const index = 1002
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 8 = 0 alors il ne doit pas y avoir 608 $302886431X ou $aActes de congrès (FAIL)", () => {
    const notice = "008"
    const index = 1002
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ============ORANGE===================================================
test("Si 105 $a Pos. 10 =1 alors il faut une 320 avec la mention \"Index\"", () => {
    const notice = "009"
    const index = 1003
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 10 =1 alors il faut une 320 avec la mention \"Index\" (FAIL)", () => {
    const notice = "010"
    const index = 1003
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 214 #4$d, la zone doit commencer par \"C espace\"", () => {
    const notice = "033"
    const index = 1006
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 214 #4$d, la zone doit commencer par \"C espace\" (FAIL)", () => {
    const notice = "034"
    const index = 1006
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 214 #0 et $d, doit commencer par \"DL espace\" ou \"[\" ou un chiffre", () => {
    const notice = "031"
    const index = 1007
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 214 #0 et $d, doit commencer par \"DL espace\" ou \"[\" ou un chiffre (FAIL)", () => {
    const notice = "032"
    const index = 1007
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 600 $2rameau doit être présent", () => {
    const notice = "009"
    const index = 1078
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 600 $2rameau doit être présent (FAIL)", () => {
    const notice = "010"
    const index = 1078
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 601 $2rameau doit être présent", () => {
    const notice = "009"
    const index = 1079
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 601 $2rameau doit être présent (FAIL)", () => {
    const notice = "010"
    const index = 1079
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 602 $2rameau doit être présent", () => {
    const notice = "009"
    const index = 1080
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 602 $2rameau doit être présent (FAIL)", () => {
    const notice = "010"
    const index = 1080
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================


test("Si 604 $2rameau doit être présent", () => {
    const notice = "009"
    const index = 1081
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 604 $2rameau doit être présent (FAIL)", () => {
    const notice = "010"
    const index = 1081
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 605 $2rameau doit être présent", () => {
    const notice = "009"
    const index = 1082
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 605 $2rameau doit être présent (FAIL)", () => {
    const notice = "010"
    const index = 1082
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================


test("Si 856$5=692669902, alors doit être présente 310 ##$aL'accès à cette ressource est réservé aux membres de Lyon 1 après authentification", () => {
    const notice = "017"
    const index = 1022
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 856$5=692669902, alors doit être présente 310 ##$aL'accès à cette ressource est réservé aux membres de Lyon 1 après authentification (FAIL)", () => {
    const notice = "018"
    const index = 1022
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// =======RED========================================================

test("Si 305$a commence par \"Document numérisé dans le cadre du projet de numérisation\", 214 $aLyon et $cBibliothèque Lyon 1", () => {
    const notice = "045"
    const index = 1010
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 305$a commence par \"Document numérisé dans le cadre du projet de numérisation\", 214 $aLyon et $cBibliothèque Lyon 1 (FAIL)", () => {
    const notice = "046"
    const index = 1010
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

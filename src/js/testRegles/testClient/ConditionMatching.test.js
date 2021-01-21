const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
import ConditionMatching from '../../regles/ConditionMatching';
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

function mockGetDataOnSudoc(number) {
    return function (datafields, number2, code) {
        return getNotice(number)
    }
}

//Red
test("Si  105 $a Pos. 0-3 différent de la valeur \"y\" alors 215$c ne doit pas être vide", () => {
    const notice = "005"
    const index = 1000
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si  105 $a Pos. 0-3 différent de la valeur \"y\" alors 215$c ne doit pas être vide (FAIL)", () => {
    const notice = "006"
    const index = 1000
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
test("Si 105 $a Pos. 8 = 1 alors il faut aussi une 608 $302886431X $aActes de congrès", () => {
    const notice = "033"
    const index = 1001
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 8 = 1 alors il faut aussi une 608 $302886431X $aActes de congrès (FAIL)", () => {
    const notice = "034"
    const index = 1001
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
test("Si 105 $a Pos. 8 = 0 alors il ne doit pas y avoir 608 $302886431X ou $aActes de congrès", () => {
    const notice = "007"
    const index = 1002
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 8 = 0 alors il ne doit pas y avoir 608 $302886431X ou $aActes de congrès (FAIL)", () => {
    const notice = "008"
    const index = 1002
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ============ORANGE===================================================
test("Si 105 $a Pos. 10 =1 alors il faut une 320 avec la mention \"Index\"", () => {
    const notice = "009"
    const index = 1003
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 10 =1 alors il faut une 320 avec la mention \"Index\" (FAIL)", () => {
    const notice = "010"
    const index = 1003
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 214 #4$d, la zone doit commencer par \"C espace\"", () => {
    const notice = "033"
    const index = 1006
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 214 #4$d, la zone doit commencer par \"C espace\" (FAIL)", () => {
    const notice = "034"
    const index = 1006
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 214 #0 et $d, doit commencer par \"DL espace\" ou \"[\" ou un chiffre", () => {
    const notice = "031"
    const index = 1007
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ========ORANGE=======================================================


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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


//ORANGE (856$5 = 692669902:676500129)
// test("Si 856$5=692669902, alors doit être présente 310 ##$aL'accès à cette ressource est réservé aux membres de Lyon 1 après authentification (FAIL)", () => {
//     const notice = "018"
//     const index = 1022
//     const sudoc = getNotice(notice);
//     const datafields = sudoc.record.datafield;
//     const controlfields = sudoc.record.controlfield;
//     let resultJson = {
//         PPN: 0,
//         errors: [],
//     };
//     addRuleToTest(index);
// const mockFunction = mockGetDataOnSudoc("");
// ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
//     expect(resultJson.errors).not.toStrictEqual([]);
// });

// ===============================================================

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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
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
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 328$zReproduction de, alors il faut une 701$4727", () => {
    const notice = "049"
    const index = 1011
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$zReproduction de, alors il faut une 701$4727 (FAIL)", () => {
    const notice = "050"
    const index = 1011
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 328$z n'est pas \"Reproduction de\", alors 701$4727 ne doit pas être présente", () => {
    const notice = "051"
    const index = 1012
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$z n'est pas \"Reproduction de\", alors 701$4727 ne doit pas être présente(FAIL)", () => {
    const notice = "052"
    const index = 1012
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ====RED===========================================================


test("Si 328$zReproduction de, alors il faut une 711$4295", () => {
    const notice = "049"
    const index = 1013
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$zReproduction de, alors il faut une 711$4295 (FAIL)", () => {
    const notice = "050"
    const index = 1013
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 328$z n'est pas \"Reproduction de\", alors 711$4295 ne doit pas être présente", () => {
    const notice = "051"
    const index = 1014
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$z n'est pas \"Reproduction de\", alors 711$4295 ne doit pas être présente (FAIL)", () => {
    const notice = "052"
    const index = 1014
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 328$zReproduction de, alors il faut une 608 $3027253139 $aThèses et écrits académiques", () => {
    const notice = "049"
    const index = 1015
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$zReproduction de, alors il faut une 608 $3027253139 $aThèses et écrits académiques (FAIL)", () => {
    const notice = "050"
    const index = 1015
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 328$z n'est pas \"Reproduction de\", alors 608 $3027253139Thèses et écrits académiques ne doit pas être présente", () => {
    const notice = "051"
    const index = 1024
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$z n'est pas \"Reproduction de\", alors 608 $3027253139Thèses et écrits académiques ne doit pas être présente (FAIL)", () => {
    const notice = "052"
    const index = 1024
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 214 ind2=2, alors $cBibliothèque Lyon 1", () => {
    const notice = "045"
    const index = 1009
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 214 ind2=2, alors $cBibliothèque Lyon 1 (FAIL)", () => {
    const notice = "046"
    const index = 1009
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================


test("608$3027253139 doit être présente", () => {
    const notice = "015"
    const index = 3000
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


// Orange (pas de 608)
// test("608$3027253139 doit être présente(FAIL)", () => {
//     const notice = "016"
//     const index = 3000
//     const sudoc = getNotice(notice);
//     const datafields = sudoc.record.datafield;
//     const controlfields = sudoc.record.controlfield;
//     let resultJson = {
//         PPN: 0,
//         errors: [],
//     };
//     addRuleToTest(index);
// const mockFunction = mockGetDataOnSudoc("");
//     ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
//     expect(resultJson.errors).not.toStrictEqual([]);
// });

// ===============================================================

test("Au moins une 711$3 = 26402823 $4=295 doit être présente", () => {
    const notice = "015"
    const index = 3002
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

// ORANGE (pas de 711 a separer en 2 regles)
// test("Au moins une 711$3 = 26402823 $4=295 doit être présente (FAIL)", () => {
//     const notice = "016"
//     const index = 3002
//     const sudoc = getNotice(notice);
//     const datafields = sudoc.record.datafield;
//     const controlfields = sudoc.record.controlfield;
//     let resultJson = {
//         PPN: 0,
//         errors: [],
//     };
//     addRuleToTest(index);
// const mockFunction = mockGetDataOnSudoc("");
//     ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
//     expect(resultJson.errors).not.toStrictEqual([]);
// });


// ===============================================================

test("Si 105 $a Pos. 4-7= m ou 7 il faut une 608 $3027253139 et $a Thèses et écrits académiques", () => {
    const notice = "005"
    const index = 3004
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 105 $a Pos. 4-7= m ou 7 il faut une 608 $3027253139 et $a Thèses et écrits académiques (FAIL)", () => {
    const notice = "006"
    const index = 3004
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

// ===============================================================



test("856$zAccès au texte intégral sauf si 856$5=692669902, alors $zAccès réservé aux membres de Lyon 1 après authentification (1)", () => {
    const notice = "017"
    const index = 3005
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

// ORANGE
// test("856$zAccès au texte intégral sauf si 856$5=692669902, alors $zAccès réservé aux membres de Lyon 1 après authentification (1) (FAIL)", () => {
//     const notice = "018"
//     const index = 3005
//     const sudoc = getNotice(notice);
//     const datafields = sudoc.record.datafield;
//     const controlfields = sudoc.record.controlfield;
//     let resultJson = {
//         PPN: 0,
//         errors: [],
//     };
//     addRuleToTest(index);
// const mockFunction = mockGetDataOnSudoc("");
//     ConditionMatching.testConditionMatchingRules(ruleTest,controlfields,datafields , resultJson);
//     expect(resultJson.errors).not.toStrictEqual([]);
// });


// ===============================================================

test("Si 105 $a Pos. 10 =0 alors il ne doit pas y avoir une 320$a = Index", () => {
    const notice = "007"
    const index = 3007
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 10 =0 alors il ne doit pas y avoir une 320$a = Index (FAIL)", () => {
    const notice = "008"
    const index = 3007
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
test("606 et $3, doit contenir $2rameau ou $2fmesh", () => {
    const notice = "009"
    const index = 3008
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("606 et $3, doit contenir $2rameau ou $2fmesh (FAIL)", () => {
    const notice = "010"
    const index = 3008
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
test("608 et $3 doit contenir $2rameau ou $2fmesh", () => {
    const notice = "009"
    const index = 3009
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("608 et $3 doit contenir $2rameau ou $2fmesh (FAIL)", () => {
    const notice = "002"
    const index = 3009
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 105 $a Pos. 4-7= v et Si 214 ind2=2, alors $aLyon", () => {
    const notice = "029"
    const index = 3011
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 105 $a Pos. 4-7= v et Si 214 ind2=2, alors $aLyon (FAIL)", () => {
    const notice = "030"
    const index = 3011
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 008 commence par Oa et 451 présente, alors vérifier que notice 451$0 contient une 008 qui commence par Oa", async () => {
    const notice = "056"
    const index = 1016
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("057");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 008 commence par Oa et 451 présente, alors vérifier que notice 451$0 contient une 008 qui commence par Oa (FAIL)", async () => {
    const notice = "058"
    const index = 1016
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("059");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 008 commence par Aa et 451 présente, alors vérifier que notice 451$0 contient une 008 qui commence par Aa",async () => {
    const notice = "053"
    const index = 1017
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("054");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 008 commence par Aa et 451 présente, alors vérifier que notice 451$0 contient une 008 qui commence par Aa (FAIL)",async () => {
    const notice = "055"
    const index = 1017
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("056");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 008 commence par Oa et 452 présente, alors vérifier que notice 452$0 contient une 008 qui commence par Aa",async () => {
    const notice = "065"
    const index = 1018
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("066");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 008 commence par Oa et 452 présente, alors vérifier que notice 452$0 contient une 008 qui commence par Aa (FAIL)",async () => {
    const notice = "067"
    const index = 1018
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("068");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});



// ===============================================================

test("Si 008 commence par Aa et 452 présente, alors vérifier que notice 452$0 contient une 008 qui commence par Oa",async () => {
    const notice = "061"
    const index = 1019
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("062");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 008 commence par Aa et 452 présente, alors vérifier que notice 452$0 contient une 008 qui commence par Oa (FAIL)", async () => {
    const notice = "063"
    const index = 1019
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("064");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});



// ===============================================================

test("Si 455, alors vérifier que la notice en 455$0 contient 105$a Pos. 4-7= m",async () => {
    const notice = "077"
    const index = 1020
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("078");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 455, alors vérifier que la notice en 455$0 contient 105$a Pos. 4-7= m (FAIL)",async () => {
    const notice = "079"
    const index = 1020
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("080");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 456, alors vérifier que la notice en 456$0 contient 105$a Pos. 4-7= v", async () => {
    const notice = "069"
    const index = 1023
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("070");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 456, alors vérifier que la notice en 456$0 contient 105$a Pos. 4-7= v (FAIL)", async () => {
    const notice = "071"
    const index = 1023
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("072");
    await ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================


test("Zones 7XX : code fonction, vérifier qu'il s'agit d'un éditeur scientifique ou d'un directeur de publication ? (FAIL)", () => {
    const notice = "032"
    const index = 6000
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionMatching.testConditionMatchingRules(ruleTest, controlfields, datafields, resultJson,mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});



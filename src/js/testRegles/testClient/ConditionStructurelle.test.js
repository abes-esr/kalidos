const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
import ConditionStructurelle from '../../regles/ConditionStructurelle';
import rules from '../../../../serveur/public/model_regles.json';
// import { testConditionStrucutrelRules } from '../../regles/ConditionStructurelle';

let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "ConditionStructurel": []
        }
    }
});


beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function mockGetDataOnSudoc(number) {
    return function (datafields, number2, code) {
        return getNotice(number)
    }
}

function addRuleToTest(index) {
    ruleTest[CATEGORIE].ConditionStructurel.push(rules[CATEGORIE].ConditionStructurel.find(x => x.index === index))
}


function getNotice(number) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'data/Notice' + number + '.xml'), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

test("Si 101 ind1=1 il faut au moins un $a et $c", () => {
    const notice = "001"
    const index = 1025
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 101 ind1=1 il faut au moins un $a et $c (FAIL)", () => {
    const notice = "002"
    const index = 1025
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 101 ind1=0 il ne faut pas $c", () => {
    const notice = "003"
    const index = 1026
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 101 ind1=0 il ne faut pas $c (FAIL)", () => {
    const notice = "004"
    const index = 1026
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 101 ind1=2 il faut au moins une $a, $b et $c", () => {
    const notice = "005"
    const index = 1027
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 101 ind1=2 il faut au moins une $a, $b et $c (FAIL)", () => {
    const notice = "006"
    const index = 1027
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 101 ind1=1 il faut une 454", () => {
    const notice = "001"
    const index = 1028
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 101 ind1=1 il faut une 454 (FAIL)", () => {
    const notice = "002"
    const index = 1028
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 101 ind1=2 il faut une 454", () => {
    const notice = "005"
    const index = 1029
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 101 ind1=2 il faut une 454 (FAIL)", () => {
    const notice = "006"
    const index = 1029
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si  105 $a Pos. 0-3 = 'y' alors 215$c ne doit pas ??tre pr??sent", () => {
    const notice = "007"
    const index = 1031
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si  105 $a Pos. 0-3 = 'y' alors 215$c ne doit pas ??tre pr??sent (FAIL)", () => {
    const notice = "008"
    const index = 1031
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 105 $a Pos. 4-7 =a alors il faut une 320", () => {
    const notice = "005"
    const index = 1032
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7 =a alors il faut une 320 (FAIL)", () => {
    const notice = "006"
    const index = 1032
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// =======================ORANGE========================================

test("Si 105 $a Pos. 4-7= t, m, l, q, j, f, e, b ou 7 il faut la pr??sence d'une 608", () => {
    const notice = "005"
    const index = 1033
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7= t, m, l, q, j, f, e, b ou 7 il faut la pr??sence d'une 608 (FAIL)", () => {
    const notice = "006"
    const index = 1033
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 008 commence par Aa, pr??sence obligatoire d'une zone 106", () => {
    const notice = "005"
    const index = 1034
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Aa, pr??sence obligatoire d'une zone 106 (FAIL)", () => {
    const notice = "006"
    const index = 1034
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 214 #1 $d obligatoire", () => {
    const notice = "009"
    const index = 1077
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 214 #1 $d obligatoire (FAIL)", () => {
    const notice = "002"
    const index = 1077
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 008 commence par Aa, 215 $a et $d obligatoires", () => {
    const notice = "009"
    const index = 1035
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Aa, 215 $a et $d obligatoires (FAIL)", () => {
    const notice = "010"
    const index = 1035
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

test("Si 008 commence par Aa, 215 $a et $d obligatoires (FAIL)", () => {
    const notice = "008"
    const index = 1035
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 225 ind1=0 il faut au moins une 410", () => {
    const notice = "031"
    const index = 1036
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 225 ind1=0 il faut au moins une 410 (FAIL)", () => {
    const notice = "032"
    const index = 1036
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 225 ind1=0 $a alors 410$0 doit ??tre pr??sent", () => {
    const notice = "037"
    const index = 1030
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 225 ind1=0 $a alors 410$0 doit ??tre pr??sent", () => {
    const notice = "039"
    const index = 1030
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 225 ind1=0 $a alors 410$0 doit ??tre pr??sent (FAIL)", () => {
    const notice = "038"
    const index = 1030
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

test("Si 225 ind1=0 $a alors 410$0 doit ??tre pr??sent (FAIL)", () => {
    const notice = "040"
    const index = 1030
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 225 ind1=2 $a alors 410$0 doit ??tre pr??sent", () => {
    const notice = "037"
    const index = 1030
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 225 ind1=2 $a alors 410$0 doit ??tre pr??sent", () => {
    const notice = "039"
    const index = 1030
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 225 ind1=2 $a alors 410$0 doit ??tre pr??sent (FAIL)", () => {
    const notice = "038"
    const index = 1030
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

test("Si 225 ind1=2 $a alors 410$0 doit ??tre pr??sent (FAIL)", () => {
    const notice = "040"
    const index = 1030
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 225 ind1=1 $a alors 461 doit ??tre pr??sent", () => {
    const notice = "041"
    const index = 1038
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 225 ind1=1 $a alors 461 doit ??tre pr??sent (FAIL)", () => {
    const notice = "042"
    const index = 1038
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 225 ind1=2 il faut au moins une 410", () => {
    const notice = "037"
    const index = 1039
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 225 ind1=2 il faut au moins une 410 (FAIL)", () => {
    const notice = "038"
    const index = 1039
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ==========ORANGE=====================================================

test("Si 008 commence par Aa et pr??sence d'une 461, alors il doit y avoir une 305 ou 225", () => {
    const notice = "041"
    const index = 1052
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


//ORANGE
// test("Si 008 commence par Aa et pr??sence d'une 461, alors il doit y avoir une 305 ou 225 (FAIL)", () => {
//     const notice = "042"
//     const index = 1052
//     const sudoc = getNotice(notice);
//     const datafields = sudoc.record.datafield;
//     const controlfields = sudoc.record.controlfield;
//     let resultJson = {
//         PPN: 0,
//         errors: [],
//     };
//     addRuleToTest(index);
//     const mockFunction =mockGetDataOnSudoc("");
//     ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
//     expect(resultJson.errors).not.toStrictEqual([]);
// });

// ===============================================================


test("Si 328$z\"Reproduction de\", 455 doit ??tre pr??sente", () => {
    const notice = "043"
    const index = 1063
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$z\"Reproduction de\", 455 doit ??tre pr??sente (FAIL)", () => {
    const notice = "044"
    const index = 1063
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================



test("Si 328$z\"Reproduction de\" , 456 ne doit pas ??tre pr??sente", () => {
    const notice = "043"
    const index = 1064
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$z\"Reproduction de\" , 456 ne doit pas ??tre pr??sente (FAIL)", () => {
    const notice = "044"
    const index = 1064
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 101$d, 330 doit ??tre pr??sente", () => {
    const notice = "043"
    const index = 1064
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 101$d, 330 doit ??tre pr??sente (FAIL)", () => {
    const notice = "044"
    const index = 1064
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 101$d, 330 doit ??tre pr??sente", () => {
    const notice = "017"
    const index = 1040
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 101$d, 330 doit ??tre pr??sente (FAIL)", () => {
    const notice = "018"
    const index = 1040
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ==============ORANGE=================================================

test("Si 105 $a Pos. 4-7= \"v\", 214 ind2=\"0\" ou ind2=\"2\"", () => {
    const notice = "043"
    const index = 1084
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7= \"v\", 214 ind2=\"0\" ou ind2=\"2\" (FAIL)", () => {
    const notice = "044"
    const index = 1084
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 105 $a Pos. 4-7= m, 214 ind2=\"1\"", () => {
    const notice = "021"
    const index = 1085
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7= m, 214 ind2=\"1\" (FAIL)", () => {
    const notice = "022"
    const index = 1085
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});



test("Si 856$5=692669902, une 310 doit ??tre pr??sente", () => {
    const notice = "045"
    const index = 1065
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

// ===========ORANGE====================================================
// test("Si 856$5=692669902, une 310 doit ??tre pr??sente (FAIL)", () => {
//     const notice = "046"
//     const index = 1065
//     const sudoc = getNotice(notice);
//     const datafields = sudoc.record.datafield;
//     const controlfields = sudoc.record.controlfield;
//     let resultJson = {
//         PPN: 0,
//         errors: [],
//     };
//     addRuleToTest(index);
//     const mockFunction =mockGetDataOnSudoc("");
//     ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
//     expect(resultJson.errors).not.toStrictEqual([]);
// });

// ===============================================================

test("Si 008 commence par Oa,  304 doit ??tre pr??sente", () => {
    const notice = "019"
    const index = 1041
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Oa,  304 doit ??tre pr??sente (FAIL)", () => {
    const notice = "020"
    const index = 1041
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 008 commence par Oa, 307 doit ??tre pr??sente", () => {
    const notice = "017"
    const index = 1042
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Oa, 307 doit ??tre pr??sente (FAIL)", () => {
    const notice = "018"
    const index = 1042
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================


test("Si 008 commence par Oa, 337 doit ??tre pr??sente", () => {
    const notice = "017"
    const index = 1043
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Oa, 337 doit ??tre pr??sente (FAIL)", () => {
    const notice = "018"
    const index = 1043
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================


test("Si 008 commence par Oa, 230 doit ??tre pr??sente", () => {
    const notice = "019"
    const index = 1044
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Oa, 230 doit ??tre pr??sente (FAIL)", () => {
    const notice = "020"
    const index = 1044
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================


test("Si 325$a commence par \"Document num??ris?? dans le cadre d'un projet de num??risation du SCD de Lyon 1 :\", 456 doit ??tre pr??sente", () => {
    const notice = "023"
    const index = 1045
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 325$a commence par \"Document num??ris?? dans le cadre d'un projet de num??risation du SCD de Lyon 1 :\", 456 doit ??tre pr??sente (FAIL)", () => {
    const notice = "024"
    const index = 1045
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 305$a commence par \"Document num??ris?? dans le cadre du projet de num??risation\", doit contenir une 324", () => {
    const notice = "045"
    const index = 1046
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 305$a commence par \"Document num??ris?? dans le cadre du projet de num??risation\", doit contenir une 324 (FAIL)", () => {
    const notice = "046"
    const index = 1046
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 305$a commence par \"Document num??ris?? dans le cadre du projet de num??risation\", doit contenir une 455", () => {
    const notice = "047"
    const index = 1047
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 305$a commence par \"Document num??ris?? dans le cadre du projet de num??risation\", doit contenir une 455 (FAIL)", () => {
    const notice = "048"
    const index = 1047
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 305$a commence par \"Document num??ris?? dans le cadre du projet de num??risation\", 214 ind1=' ' et ind2=\"0\"", () => {
    const notice = "047"
    const index = 1074
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 305$a commence par \"Document num??ris?? dans le cadre du projet de num??risation\", 214 ind1=' ' et ind2=\"0\" (FAIL)", () => {
    const notice = "048"
    const index = 1074
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 328$zReproduction de, alors il faut une 029", () => {
    const notice = "049"
    const index = 1060
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$zReproduction de, alors il faut une 029 (FAIL)", () => {
    const notice = "050"
    const index = 1060
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 328$z n'est pas \"Reproduction de\", alors 029 ne doit pas ??tre pr??sente", () => {
    const notice = "051"
    const index = 1061
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$z n'est pas \"Reproduction de\", alors 029 ne doit pas ??tre pr??sente (FAIL)", () => {
    const notice = "052"
    const index = 1061
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 105 $a Pos. 4-7= m, 328$z ne doit pas ??tre pr??sente", () => {
    const notice = "015"
    const index = 3001
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7= m, 328$z ne doit pas ??tre pr??sente (FAIL)", () => {
    const notice = "016"
    const index = 3001
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================



test("Si 008 commence par Oa et ne contient pas une 215, une 856 doit ??tre pr??sente", () => {
    const notice = "017"
    const index = 3003
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Oa et ne contient pas une 215, une 856 doit ??tre pr??sente (FAIL)", () => {
    const notice = "018"
    const index = 3003
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================



test("214 #0 ou 214#1 obligatoire, sauf si 105$b=v", () => {
    const notice = "020"
    const index = 1073
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("214 #0 ou 214#1 obligatoire, sauf si 105$b=v (FAIL)", () => {
    const notice = "019"
    const index = 1073
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================



test("Si 105 $a Pos. 4-7= v, 456 ne doit pas ??tre pr??sente", () => {
    const notice = "029"
    const index = 3010
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7= v, 456 ne doit pas ??tre pr??sente (FAIL)", () => {
    const notice = "030"
    const index = 3010
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================



test("Si 105 $a Pos. 4-7= m, alors il faut une 029", () => {
    const notice = "021"
    const index = 3012
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7= m, alors il faut une 029 (FAIL)", () => {
    const notice = "022"
    const index = 3012
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});



// ===============================================================



test("Si 105 $a Pos. 4-7= m, alors il faut une 029", () => {
    const notice = "021"
    const index = 3012
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7= m, alors il faut une 029 (FAIL)", () => {
    const notice = "022"
    const index = 3012
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================



test("Si 105 $a Pos. 4-7= m ou 7, alors il faut une 328", () => {
    const notice = "021"
    const index = 3013
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7= m ou 7, alors il faut une 328 (FAIL)", () => {
    const notice = "022"
    const index = 3013
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 105 $a Pos. 4-7= v ou 7, alors il faut une 017", () => {
    const notice = "027"
    const index = 3014
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7= v ou 7, alors il faut une 017 (FAIL)", () => {
    const notice = "028"
    const index = 3014
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 452, alors v??rifier que la notice 452$0 contient une 452 r??ciproque et une 328$z", async () => {
    const notice = "061"
    const index = 1054
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("062");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 452, alors v??rifier que la notice 452$0 contient une 452 r??ciproque et une 328$z (FAIL)",async () => {
    const notice = "063"
    const index = 1054
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("064");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 451, alors v??rifier que la notice 451$0 contient une 451 r??ciproque", async () => {
    const notice = "053"
    const index = 1053
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("054");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 451, alors v??rifier que la notice 451$0 contient une 451 r??ciproque (FAIL)", async () => {
    const notice = "055"
    const index = 1053
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("053");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 488, alors v??rifier les liens r??ciproques de la notice en 488$0", async () => {
    const notice = "053"
    const index = 1055
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("054");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 488, alors v??rifier les liens r??ciproques de la notice en 488$0 (FAIL)", async () => {
    const notice = "055"
    const index = 1055  
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("056");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 455, alors v??rifier que la notice en 455$0 contient une 456 avec liens r??ciproques", async () => {
    const notice = "077"
    const index = 1056
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("078");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 455, alors v??rifier que la notice en 455$0 contient une 456 avec liens r??ciproques (FAIL)",async () => {
    const notice = "079"
    const index = 1056
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("080");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 455, alors v??rifier que la notice en 455$0 ne contient pas 328$z", async () => {
    const notice = "077"
    const index = 1067
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("078");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 455, alors v??rifier que la notice en 455$0 ne contient pas 328$z (FAIL)", async () => {
    const notice = "079"
    const index = 1067
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("080");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 456, alors v??rifier que la notice en 456$0 contient une 455 avec liens r??ciproques", async () => {
    const notice = "069"
    const index = 1057
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("070");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 456, alors v??rifier que la notice en 456$0 contient une 455 avec liens r??ciproques (FAIL)",async () => {
    const notice = "071"
    const index = 1057
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("072");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 105 $a Pos. 4-7= v, alors il faut une 328$z", () => {
    const notice = "029"
    const index = 1051
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 105 $a Pos. 4-7= v, alors il faut une 328$z (FAIL)", () => {
    const notice = "030"
    const index = 1051
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction =mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});



// ===============================================================

test("Si 456, alors v??rifier que la notice en 456$0  contient  328$z", async () => {
    const notice = "069"
    const index = 1068
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("070");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 456, alors v??rifier que la notice en 456$0  contient  328$z (FAIL)", async () => {
    const notice = "071"
    const index = 1068
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("072");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 451 et 328$z, alors v??rifier que la notice 451$0 ne contient pas 328$z", async () => {
    const notice = "083"
    const index = 1069
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("084");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 451 et 328$z, alors v??rifier que la notice 451$0 ne contient pas 328$z (FAIL)", async () => {
    const notice = "085"
    const index = 1069
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("086");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
test("Si 451 et absence de 328$z, alors v??rifier que la notice 451$0 contient 328$z", async () => {
    const notice = "053"
    const index = 1070
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("054");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 451 et absence de 328$z, alors v??rifier que la notice 451$0 contient 328$z (FAIL)", async () => {
    const notice = "081"
    const index = 1070
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    const mockFunction = mockGetDataOnSudoc("082");
    await ConditionStructurelle.testConditionStrucutrelRules(CATEGORIE, ruleTest, controlfields, datafields, resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});
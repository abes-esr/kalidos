const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const ConditionStructurelle = require('../../regles/ConditionStructurelle');
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si  105 $a Pos. 0-3 = 'y' alors 215$c ne doit pas être présent", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si  105 $a Pos. 0-3 = 'y' alors 215$c ne doit pas être présent (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// =======================ORANGE========================================

test("Si 105 $a Pos. 4-7= t, m, l, q, j, f, e, b ou 7 il faut la présence d'une 608", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7= t, m, l, q, j, f, e, b ou 7 il faut la présence d'une 608 (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 008 commence par Aa, présence obligatoire d'une zone 106", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Aa, présence obligatoire d'une zone 106 (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 225 ind1=0 $a alors 410$0 doit être présent", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 225 ind1=0 $a alors 410$0 doit être présent", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 225 ind1=0 $a alors 410$0 doit être présent (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

test("Si 225 ind1=0 $a alors 410$0 doit être présent (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 225 ind1=2 $a alors 410$0 doit être présent", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 225 ind1=2 $a alors 410$0 doit être présent", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 225 ind1=2 $a alors 410$0 doit être présent (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

test("Si 225 ind1=2 $a alors 410$0 doit être présent (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 225 ind1=1 $a alors 461 doit être présent", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 225 ind1=1 $a alors 461 doit être présent (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ==========ORANGE=====================================================

test("Si 008 commence par Aa et présence d'une 461, alors il doit y avoir une 305 ou 225", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


//ORANGE
// test("Si 008 commence par Aa et présence d'une 461, alors il doit y avoir une 305 ou 225 (FAIL)", () => {
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
//     const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
//     ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
//     expect(resultJson.errors).not.toStrictEqual([]);
// });

// ===============================================================


test("Si 328$z\"Reproduction de\", 455 doit être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$z\"Reproduction de\", 455 doit être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================



test("Si 328$z\"Reproduction de\" , 456 ne doit pas être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$z\"Reproduction de\" , 456 ne doit pas être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 101$d, 330 doit être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 101$d, 330 doit être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 101$d, 330 doit être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 101$d, 330 doit être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});



test("Si 856$5=692669902, une 310 doit être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});

// ===========ORANGE====================================================
// test("Si 856$5=692669902, une 310 doit être présente (FAIL)", () => {
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
//     const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
//     ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
//     expect(resultJson.errors).not.toStrictEqual([]);
// });

// ===============================================================

test("Si 008 commence par Oa,  304 doit être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Oa,  304 doit être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 008 commence par Oa, 307 doit être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Oa, 307 doit être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================


test("Si 008 commence par Oa, 337 doit être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Oa, 337 doit être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================


test("Si 008 commence par Oa, 230 doit être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Oa, 230 doit être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================


test("Si 325$a commence par \"Document numérisé dans le cadre d'un projet de numérisation du SCD de Lyon 1 :\", 456 doit être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 325$a commence par \"Document numérisé dans le cadre d'un projet de numérisation du SCD de Lyon 1 :\", 456 doit être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 305$a commence par \"Document numérisé dans le cadre du projet de numérisation\", doit contenir une 324", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 305$a commence par \"Document numérisé dans le cadre du projet de numérisation\", doit contenir une 324 (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 305$a commence par \"Document numérisé dans le cadre du projet de numérisation\", doit contenir une 455", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 305$a commence par \"Document numérisé dans le cadre du projet de numérisation\", doit contenir une 455 (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 305$a commence par \"Document numérisé dans le cadre du projet de numérisation\", 214 ind1=' ' et ind2=\"0\"", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 305$a commence par \"Document numérisé dans le cadre du projet de numérisation\", 214 ind1=' ' et ind2=\"0\" (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 328$z n'est pas \"Reproduction de\", alors 029 ne doit pas être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 328$z n'est pas \"Reproduction de\", alors 029 ne doit pas être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 105 $a Pos. 4-7= m, 328$z ne doit pas être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 105 $a Pos. 4-7= m, 328$z ne doit pas être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================



test("Si 008 commence par Oa et ne contient pas une 215, une 856 doit être présente", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 008 commence par Oa et ne contient pas une 215, une 856 doit être présente (FAIL)", () => {
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
    const mockFunction = ConditionStructurelle.mockGetDataOnSudoc("");
    ConditionStructurelle.testConditionStrucutrelRules(ruleTest,controlfields,datafields , resultJson, mockFunction);
    expect(resultJson.errors).not.toStrictEqual([]);
});


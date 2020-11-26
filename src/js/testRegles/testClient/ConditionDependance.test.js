const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const ConditionDependance = require('../../regles/ConditionDependance');
import rules from '../../../../serveur/public/model_regles.json';

let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "ConditionDependance": []
        }
    }
});

beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function addRuleToTest(index) {
    ruleTest[CATEGORIE].ConditionDependance.push(rules[CATEGORIE].ConditionDependance.find(x => x.index === index))
}

function getNotice(number) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'data/Notice' + number + '.xml'), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

test("Si 225 ind1=0 $a est différent du 410$t", () => {
    const notice = "033"
    const index = 2000
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionDependance.testConditionDependanceRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 225 ind1=0 $a est différent du 410$t (FAIL)", () => {
    const notice = "034"
    const index = 2000
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionDependance.testConditionDependanceRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================


test("Si 225 ind1=2 $a = 410$t", () => {
    const notice = "035"
    const index = 1075
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionDependance.testConditionDependanceRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 225 ind1=2 $a = 410$t (FAIL)", () => {
    const notice = "036"
    const index = 1075
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionDependance.testConditionDependanceRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 455, alors la date en 455$d = date en zone 100 position 13-16 ", () => {
    const notice = "047"
    const index = 1076
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionDependance.testConditionDependanceRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 455, alors la date en 455$d = date en zone 100 position 13-16  (FAIL)", () => {
    const notice = "048"
    const index = 1076
    const sudoc = getNotice(notice);
    const datafields = sudoc.record.datafield;
    const controlfields = sudoc.record.controlfield;;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    ConditionDependance.testConditionDependanceRules(ruleTest,controlfields,datafields , resultJson);
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
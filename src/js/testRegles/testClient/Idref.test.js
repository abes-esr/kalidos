const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const IdRef = require('../../regles/IdRef');
import rules from '../../../../serveur/public/model_regles.json';

let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "idRef": []
        }
    }
});

beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function getNotice(number) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'data/Notice' + number + '.xml'), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

function getIdref(notice, number) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'idref/idref_' + notice + "_" + number + '.xml'), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}
function addRuleToTest(index) {
    ruleTest[CATEGORIE].idRef.push(rules[CATEGORIE].idRef.find(x => x.index === index))
}

function testIdRefRules(categorie, rules, idref, datafields, resultJson) {
    rules[categorie].idRef.forEach(function (regle) {
        if (IdRef.conditionNotice(datafields, regle)) {
            const identifiant = IdRef.identifiantNotice(datafields, regle)
            if (identifiant != null) {
                IdRef.validateIdRef(idref, regle, resultJson)
            } else {


                resultJson.errors.push({
                    message: regle.message + " ( " + regle.index + " ) ",
                    number: regle.number,
                    code: regle.code
                });
            }
        }
    });
}



test("Si 600$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tp", () => {
    const notice = "009"
    const number = "600"
    const index = 53
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 600$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tp (FAIL)", () => {
    const notice = "010"
    const number = "600"
    const index = 53
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================


test("Si 702, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tp", () => {
    const notice = "009"
    const number = "702"
    const index = 64
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 702, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tp (FAIL)", () => {
    const notice = "010"
    const number = "702"
    const index = 64
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 710, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tb", () => {
    const notice = "009"
    const number = "710"
    const index = 65
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 710, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tb (FAIL)", () => {
    const notice = "010"
    const number = "710"
    const index = 65
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 700, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tp", () => {
    const notice = "010"
    const number = "700"
    const index = 63
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

test("Si 700, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tp (FAIL)", () => {
    const notice = "010"
    const number = "700"
    const index = 63
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================


test("Si 602$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Ta", () => {
    const notice = "009"
    const number = "602"
    const index = 55
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});


test("Si 602$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Ta (FAIL)", () => {
    const notice = "010"
    const number = "602"
    const index = 55
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================


test("Si 604$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tq", () => {
    const notice = "009"
    const number = "604"
    const index = 56
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 604$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tq (FAIL)", () => {
    const notice = "010"
    const number = "604"
    const index = 56
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 605$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tu", () => {
    const notice = "009"
    const number = "605"
    const index = 57
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 605$a, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tu (FAIL)", () => {
    const notice = "010"
    const number = "605"
    const index = 57
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================


test("Si 711, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tb", () => {
    const notice = "009"
    const number = "711"
    const index = 66
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 711, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tb (FAIL)", () => {
    const notice = "010"
    const number = "711"
    const index = 66
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 712, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tb", () => {
    const notice = "009"
    const number = "712"
    const index = 67
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 712, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Tb (FAIL)", () => {
    const notice = "010"
    const number = "712"
    const index = 67
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("Si 720, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Ta", () => {
    const notice = "003"
    const number = "720"
    const index = 68
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 720, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Ta (FAIL)", () => {
    const notice = "004"
    const number = "720"
    const index = 68
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});



// ===============================================================

test("Si 721, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Ta", () => {
    const notice = "003"
    const number = "721"
    const index = 69
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 721, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Ta (FAIL)", () => {
    const notice = "004"
    const number = "721"
    const index = 69
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("Si 722, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Ta", () => {
    const notice = "003"
    const number = "721"
    const index = 70
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 722, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Ta (FAIL)", () => {
    const notice = "004"
    const number = "721"
    const index = 70
    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
test("Si 6XX$x et $2rameau, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Td", () => {
    const notice = "011"
    const number = "600"
    const index = 74
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test("Si 6XX$x et $2rameau, vérifier dans Idref, à partir de l'identifiant $3, que 008 commence par Td", () => {
    const notice = "012"
    const number = "600"
    const index = 74
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const sudoc = getNotice(notice);
    const idref = getIdref(notice, number);
    const datafields = sudoc.record.datafield;
    addRuleToTest(index);
    testIdRefRules(CATEGORIE, ruleTest, idref, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

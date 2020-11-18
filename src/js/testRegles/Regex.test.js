const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const Matching = require("../regles/Matching");
import rules from '../../../serveur/public/model_regles.json';

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

function getPPN(link) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'testPPN/PPNRegex/' + link), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

function addRuleToTest(index) {
    ruleTest[CATEGORIE].matching.push(rules[CATEGORIE].matching.find(x => x.index === index))
}



// ===============================================================

test('caractères interdits : $', () => {
    const number = 201;
    const code = "c";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 1;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('caractères interdits : $ FAIL', () => {
    const number = 201;
    const code = "c";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 1;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test('701$f doit contenir 9 caractères', () => {
    const number = 701;
    const code = "f";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 5;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('701$f doit contenir 9 caractères FAIL', () => {
    const number = 701;
    const code = "f";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 5;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test('200$c ne doit pas contenir le caractère / ou : ou .', () => {
    const number = 200;
    const code = "c";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 6;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$c ne doit pas contenir le caractère / ou : ou . FAIL', () => {
    const number = 200;
    const code = "c";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 6;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

test('200$c ne doit pas contenir le caractère / ou : ou . FAIL', () => {
    const number = 200;
    const code = "c";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail2.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 6;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

test('200$c ne doit pas contenir le caractère / ou : ou . FAIL', () => {
    const number = 200;
    const code = "c";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail3.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 6;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test('200$d doit commencer par espace =', () => {
    const number = 200;
    const code = "d";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 7;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$d doit commencer par espace = FAIL', () => {
    const number = 200;
    const code = "d";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 7;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test('856$u ne doit pas contenir URL', () => {
    const number = 856;
    const code = "u";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 8;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('856$u ne doit pas contenir URL FAIL', () => {
    const number = 856;
    const code = "u";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 8;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test('100$a ne doit pas contenir le caractère ?', () => {
    const number = 100;
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 9;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test('100$a ne doit pas contenir le caractère ? FAIL', () => {
    const number = 100;
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 9;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test('307$a ne doit pas contenir le caractère ?', () => {
    const number = 307;
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 10;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('307$a ne doit pas contenir le caractère ? FAIL', () => {
    const number = 307;
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 10;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test('700$b ne doit pas contenir Prénom', () => {
    const number = 700;
    const code = "b";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 11;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('700$b ne doit pas contenir Prénom FAIL', () => {
    const number = 700;
    const code = "b";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 11;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test('7X0 et 7X1 ne doit pas contenir $4=020, 050, 060, 075, 080, 140, 150, 160, 310, 320, 390, 450, 490, 500, 540, 580, 610, 620, 640, 650, 680, 700, 720, 740, 750, 753', () => {
    const number = '7XX';
    const code = "4";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 38;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('7X0 et 7X1 ne doit pas contenir $4=020, 050, 060, 075, 080, 140, 150, 160, 310, 320, 390, 450, 490, 500, 540, 580, 610, 620, 640, 650, 680, 700, 720, 740, 750, 753 FAIL', () => {
    const number = '7XX';
    const code = "4";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 38;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================
test('214$d ne doit pas contenir le caractère ?', () => {
    const number = 214;
    const code = "d";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 12;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('214$d ne doit pas contenir le caractère ? FAIL', () => {
    const number = 214;
    const code = "d";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 12;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test('Ne doit pas contenir le caractère ’', () => {
    const number = 'global';
    const PPN = getPPN(number + '/' + number + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 25;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson);
    expect(resultJson.errors).toStrictEqual([]);
});

test('Ne doit pas contenir le caractère ’ FAIL', () => {
    const number = 'global';
    const PPN = getPPN(number + '/' + number + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 25;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test('029$a=FR', () => {
    const number = "029";
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 13;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('029$a=FR FAIL', () => {
    const number = "029";
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 13;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test('700$a ne doit pas contenir Nom', () => {
    const number = "700";
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 14;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('700$a ne doit pas contenir Nom FAIL', () => {
    const number = "700";
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 14;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test('701$b ne doit pas contenir Prénom', () => {
    const number = "701";
    const code = "b";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 15;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('701$b ne doit pas contenir Prénom FAIL', () => {
    const number = "701";
    const code = "b";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 15;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test('606$a ne doit pas contenir vedette', () => {
    const number = "606";
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 16;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('606$a ne doit pas contenir vedette FAIL', () => {
    const number = "606";
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 16;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test('330$a ne doit pas contenir Résumé en français', () => {
    const number = "330";
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 17;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('330$a ne doit pas contenir Résumé en français FAIL', () => {
    const number = "330";
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 17;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("328$e = Lyon 1 ou Université de Lyon", () => {
    const number = "328";
    const code = "e";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 18;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('328$e = Lyon 1 ou Université de Lyon FAIL', () => {
    const number = "328";
    const code = "e";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 18;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("328$d ne doit pas contenir le caractère ?", () => {
    const number = "328";
    const code = "d";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 19;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('328$d ne doit pas contenir le caractère ? FAIL', () => {
    const number = "328";
    const code = "d";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 19;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("200$g ne doit pas finir par sous la direction de", () => {
    const number = "200";
    const code = "g";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 21;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$g ne doit pas finir par sous la direction de FAIL', () => {
    const number = "200";
    const code = "g";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 21;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("200$e ne doit pas être complément du titre", () => {
    const number = "200";
    const code = "e";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 22;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$e ne doit pas être complément du titre FAIL', () => {
    const number = "200";
    const code = "e";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 22;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test("200$a ne doit pas être Le Titre", () => {
    const number = "200";
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 23;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$a ne doit pas être Le Titre FAIL', () => {
    const number = "200";
    const code = "a";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 23;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("029$b ne doit pas contenir le caractère ?", () => {
    const number = "029";
    const code = "b";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 24;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('029$b ne doit pas contenir le caractère ? FAIL', () => {
    const number = "029";
    const code = "b";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 24;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test("200$e ne doit pas contenir le caractère / ou : ou .", () => {
    const number = "200";
    const code = "e";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 26;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$e ne doit pas contenir le caractère / ou : ou . FAIL', () => {
    const number = "200";
    const code = "e_2";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };

    const index = 26;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});



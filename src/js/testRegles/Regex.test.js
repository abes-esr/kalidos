const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const Matching = require("../regles/Matching");
import rules from '../../../serveur/public/model_regles.json';

let CATEGORIE;

beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function getPPN(link) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'testPPN/PPNRegex/' + link), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

// test('700$a ne doit pas contenir Nom', () => {
//     const number = "700";
//     const code = "a";
//     const nameFile = number + '_' + code;
//     const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
//     const datafields = PPN.record.datafield;
//     let resultJson = {
//         PPN: 0,
//         errors: [],
//     };
//     Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

//     expect(resultJson.errors).toStrictEqual([]);
// });

// test('700$a ne doit pas contenir Nom FAIL', () => {
//     const number = "700";
//     const code = "a";
//     const nameFile = number + '_' + code;
//     const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
//     const datafields = PPN.record.datafield;
//     let resultJson = {
//         PPN: 0,
//         errors: [],
//     };
//     Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
//     expect(resultJson.errors).not.toStrictEqual([]);
// });


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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
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
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$e ne doit pas contenir le caractère / ou : ou . FAIL', () => {
    const number = "200";
    const code = "e";
    const nameFile = number + '_' + code;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    Matching.testMatchRegexRules(CATEGORIE, rules, undefined, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});



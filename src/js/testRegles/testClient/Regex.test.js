const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
import Matching from '../../regles/Matching';
import rules from '../../../../serveur/public/model_regles.json';



let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "matching": []
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
    ruleTest[CATEGORIE].matching.push(rules[CATEGORIE].matching.find(x => x.index === index))
}



// ===============================================================

test('008 doit contenir "x3"', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 71;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('008 doit contenir "x3" (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 71;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});




test('Zone 100 : langue de catalogage à corriger ', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 73;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});



test('Zone 100 : langue de catalogage à corriger (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 73;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Données codées à compléter ', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 500;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Données codées à compléter (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 500;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Données codées à compléter ', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 500;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Données codées à compléter (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 500;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Données codées à compléter ', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 500;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Données codées à compléter (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 500;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 105 à compléter ', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 501;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 105 à compléter (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 501;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Zone 105 à compléter ', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 501;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 105 à compléter (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 501;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Zone 200 : supprimer le double espace ', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 502;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 200 : supprimer le double espace (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 502;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    // expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 200 : corriger la ponctuation du titre parallèle : "$d= Titre" ', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 7;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 200 : corriger la ponctuation du titre parallèle : "$d= Titre" (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 7;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('200$a ne doit pas contenir le caractère / ou : ou . ', () => {
    const notice = getNotice("003");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 503;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test('200$a ne doit pas contenir le caractère / ou : ou . ', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 503;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$a ne doit pas contenir le caractère / ou : ou . ', () => {
    const notice = getNotice("005");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 503;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$a ne doit pas contenir le caractère / ou : ou . (FAIL)', () => {
    const notice = getNotice("004");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 503;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

test('200$a ne doit pas contenir le caractère / ou : ou . (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 503;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

test('200$a ne doit pas contenir le caractère / ou : ou . (FAIL)', () => {
    const notice = getNotice("006");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 503;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('200$e ne doit pas contenir le caractère / ou : ou . ', () => {
    const notice = getNotice("003");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 26;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$e ne doit pas contenir le caractère / ou : ou . (FAIL)', () => {
    const notice = getNotice("004");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 26;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('200$e ne doit pas contenir le caractère / ou : ou . ', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 504;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$e ne doit pas contenir le caractère / ou : ou . (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 504;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('200$e ne doit pas contenir le caractère / ou : ou . ', () => {
    const notice = getNotice("003");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 6;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$e ne doit pas contenir le caractère / ou : ou . (FAIL)', () => {
    const notice = getNotice("004");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 6;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Vérifier les dates de l\'autorité auteur ', () => {
    const notice = getNotice("009");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 505;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Vérifier les dates de l\'autorité auteur (FAIL)', () => {
    const notice = getNotice("010");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 505;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Vérifier les dates de l\'autorité auteur ', () => {
    const notice = getNotice("009");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 506;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Vérifier les dates de l\'autorité auteur (FAIL)', () => {
    const notice = getNotice("010");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 506;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Zones 6XX : $2 mal orthographié ', () => {
    const notice = getNotice("003");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 507;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

test('Zones 6XX : $2 mal orthographié ', () => {
    const notice = getNotice("009");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 507;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

test('Zones 6XX : $2 mal orthographié (FAIL)', () => {
    const notice = getNotice("010");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 507;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Ne doit pas contenir le caractère ’ ', () => {
    const notice = getNotice("013");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 25
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Ne doit pas contenir le caractère ’ (FAIL)', () => {
    const notice = getNotice("014");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 25;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Zones 7XX : code fonction erroné', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 508
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zones 7XX : code fonction erroné (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 508;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zones 7XX : code fonction à employer uniquement lorsqu\'aucune autre fonction plus spécifique ne convient', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 509
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zones 7XX : code fonction à employer uniquement lorsqu\'aucune autre fonction plus spécifique ne convient (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 509;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('7X0 et 7X1 ne doit pas contenir $4=020, 050, 060, 075, 080, 140, 150, 160, 310, 320, 390, 450, 490, 500, 540, 580, 610, 620, 640, 650, 680, 700, 720, 740, 750, 753', () => {
    const notice = getNotice("017");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 38
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('7X0 et 7X1 ne doit pas contenir $4=020, 050, 060, 075, 080, 140, 150, 160, 310, 320, 390, 450, 490, 500, 540, 580, 610, 620, 640, 650, 680, 700, 720, 740, 750, 753 (FAIL)', () => {
    const notice = getNotice("018");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 38;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('7X2 $4=020, 050, 060, 075, 080, 140, 150, 160, 310, 320, 390, 450, 490, 500, 540, 580, 610, 620, 640, 650, 680, 700, 720, 740, 750, 753', () => {
    const notice = getNotice("017");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 39
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('7X2 $4=020, 050, 060, 075, 080, 140, 150, 160, 310, 320, 390, 450, 490, 500, 540, 580, 610, 620, 640, 650, 680, 700, 720, 740, 750, 753 (FAIL)', () => {
    const notice = getNotice("018");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 39;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});



// =================================================

test('Zone 230 : corriger le poids en Ko ?', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 512
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 230 : corriger le poids en Ko (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 512;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 230 : corriger le poids en Ko ?', () => {
    const notice = getNotice("001");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 513
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 230 : corriger le poids en Ko (FAIL)', () => {
    const notice = getNotice("002");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 513;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 230 : corriger le poids en Ko ?', () => {
    const notice = getNotice("017");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 514
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 230 : corriger le poids en Ko (FAIL)', () => {
    const notice = getNotice("018");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 514;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 215 : compléter la pagination', () => {
    const notice = getNotice("021");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 515
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 215 : compléter la pagination (FAIL)', () => {
    const notice = getNotice("022");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 515;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 029 : le numéro d\'ordre doit contenir 12 caractères', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 516
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 029 : le numéro d\'ordre doit contenir 12 caractères (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 516;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('029$b ne doit pas contenir le caractère ?', () => {
    const notice = getNotice("017");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 24;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('029$b ne doit pas contenir le caractère ? (FAIL)', () => {
    const notice = getNotice("018");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 24;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('029$a=FR', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 13;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('029$a=FR (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 13;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('100$a ne doit pas contenir le caractère "?"', () => {
    const notice = getNotice("017");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 9;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('100$a ne doit pas contenir le caractère "?" (FAIL)', () => {
    const notice = getNotice("018");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 9;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Zone 102 $a doit être FR', () => {
    const notice = getNotice("017");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 517;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 102 $a doit être FR (FAIL)', () => {
    const notice = getNotice("018");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 517;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('200$a ne doit pas être Le Titre', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 23;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$a ne doit pas être Le Titre (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 23;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('200$e ne doit pas être complément du titre', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 22;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$e ne doit pas être complément du titre (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 22;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Zone 200 : compléter le nom de l\'auteur', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 518;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 200 : compléter le nom de l\'auteur (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 518;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('200$g ne doit pas finir par sous la direction de', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 21;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('200$g ne doit pas finir par sous la direction de (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 21;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('214$d ne doit pas contenir le caractère ?', () => {
    const notice = getNotice("017");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 12;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('214$d ne doit pas contenir le caractère ? (FAIL)', () => {
    const notice = getNotice("018");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 12;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('230$a ne doit pas contenir le caractère ?', () => {
    const notice = getNotice("027");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 20;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('230$a ne doit pas contenir le caractère ? (FAIL)', () => {
    const notice = getNotice("028");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 20;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('307$a ne doit pas contenir le caractère ?', () => {
    const notice = getNotice("017");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 10;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

// ORANGE pas de 307 :)
// test('307$a ne doit pas contenir le caractère ? (FAIL)', () => {
//     const notice = getNotice("018");
//     const datafields = notice.record.datafield;
//     const controlfield = notice.record.controlfield;
//     let resultJson = {
//         PPN: 0,
//         errors: [],
//     };
//     const index = 10;
//     addRuleToTest(index);
//     Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

//     expect(resultJson.errors).not.toStrictEqual([]);
// });


// =================================================

test('Zone 320 à compléter', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 519;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 320 à compléter (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 519;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Zone 328$c : les sous-disciplines doivent être séparées par un point', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 520;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 328$c : les sous-disciplines doivent être séparées par un point (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 520;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 328$c compléter la discipline', () => {
    const notice = getNotice("017");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 521;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 328$c compléter la discipline (FAIL)', () => {
    const notice = getNotice("018");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 521;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Zone 328$d doit contenir uniquement l\'année de soutenance', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 522;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 328$d doit contenir uniquement l\'année de soutenance (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 522;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 328$d doit contenir uniquement l\'année de soutenance', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 523;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 328$d doit contenir uniquement l\'année de soutenance (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 523;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Zone 328$d doit contenir uniquement l\'année de soutenance', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 18;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 328$d doit contenir uniquement l\'année de soutenance (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 18;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('330$a ne doit pas contenir Résumé en français', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 17;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('330$a ne doit pas contenir Résumé en français (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 17;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('606$a ne doit pas contenir vedette', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 16;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('606$a ne doit pas contenir vedette (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 16;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('700$a ne doit pas contenir Nom', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 14;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('700$a ne doit pas contenir Nom (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 14;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 700 : lien auteur à effectuer', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 524;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 700 : lien auteur à effectuer (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 524;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 700 : lien auteur à effectuer', () => {
    const notice = getNotice("015");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 525;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 700 : lien auteur à effectuer (FAIL)', () => {
    const notice = getNotice("016");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 525;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});
// =================================================

test('Zone 701 : lien auteur à effectuer', () => {
    const notice = getNotice("017");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 526;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 701 : lien auteur à effectuer (FAIL)', () => {
    const notice = getNotice("018");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 526;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('701$b ne doit pas contenir Prénom', () => {
    const notice = getNotice("017");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 15;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('701$b ne doit pas contenir Prénom (FAIL)', () => {
    const notice = getNotice("018");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 15;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Zone 339 : corriger avec l\'année de mise en ligne', () => {
    const notice = getNotice("047");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 527;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 339 : corriger avec l\'année de mise en ligne (FAIL)', () => {
    const notice = getNotice("048");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 527;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 230 à compléter', () => {
    const notice = getNotice("045");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 528;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 230 à compléter (FAIL)', () => {
    const notice = getNotice("046");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 528;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 307 à compléter', () => {
    const notice = getNotice("047");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 529;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 307 à compléter (FAIL)', () => {
    const notice = getNotice("048");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 529;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 303 à compléter', () => {
    const notice = getNotice("047");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 530;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 303 à compléter (FAIL)', () => {
    const notice = getNotice("048");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 530;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 337 à compléter', () => {
    const notice = getNotice("045");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 531;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 337 à compléter (FAIL)', () => {
    const notice = getNotice("046");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 531;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});



// =================================================

test('Zone 305$2 générique à remplacer-supprimer', () => {
    const notice = getNotice("019");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 532;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 305$2 générique à remplacer-supprimer (FAIL)', () => {
    const notice = getNotice("020");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 532;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});


// =================================================

test('Zone 305$2 générique à remplacer-supprimer', () => {
    const notice = getNotice("019");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 533;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 305$2 générique à remplacer-supprimer (FAIL)', () => {
    const notice = getNotice("020");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 533;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('107$2 à corriger (\"MEMLyon1\")', () => {
    const notice = getNotice("025");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 534;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('107$2 à corriger (\"MEMLyon1\") (FAIL)', () => {
    const notice = getNotice("026");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 534;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 305 générique à remplacer-supprimer', () => {
    const notice = getNotice("047");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 535;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 305 générique à remplacer-supprimer (FAIL)', () => {
    const notice = getNotice("048");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 535;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});

// =================================================

test('Zone 324 à compléter', () => {
    const notice = getNotice("047");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 536;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).toStrictEqual([]);
});

test('Zone 324 à compléter (FAIL)', () => {
    const notice = getNotice("048");
    const datafields = notice.record.datafield;
    const controlfield = notice.record.controlfield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    const index = 536;
    addRuleToTest(index);
    Matching.testMatchRegexRules(CATEGORIE, ruleTest, controlfield, datafields, resultJson)

    expect(resultJson.errors).not.toStrictEqual([]);
});




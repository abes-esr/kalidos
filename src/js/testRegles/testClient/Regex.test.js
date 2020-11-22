const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const Matching = require('../../regles/Matching');
import rules from '../../../../serveur/public/model_regles.json';



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


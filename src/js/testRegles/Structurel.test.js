const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
import Structurel from "../regles/Structurel";
import rules from '../../../serveur/public/model_regles.json';

let CATEGORIE;
let ruleTest;

beforeEach(() => {
    ruleTest = {
        "Generale": {
            "Structurel":[]
        }
    }
});

beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function getPPN(link) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'testPPN/Structurel/' + link), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

function addRuleToTest(numRuleExcell) {
    ruleTest[CATEGORIE].Structurel.push(rules[CATEGORIE].Structurel.find(x => x.numRuleExcell === numRuleExcell))
}



// ===============================================================

test('La notice doit contenir au moins une zone 181', () => {
    const number = 181;
    const numRuleExcell = 22;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('La notice doit contenir au moins une zone 181 FAIL', () => {
    const number = 181;
    const numRuleExcell = 22;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test('La notice doit contenir au moins une zone 182', () => {
    const number = 182;
    const numRuleExcell = 23;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('La notice doit contenir au moins une zone 182 FAIL', () => {
    const number = 182;
    const numRuleExcell = 23;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================

test('La notice doit contenir au moins une zone 183', () => {
    const number = 183;
    const numRuleExcell = 24;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('La notice doit contenir au moins une zone 183 FAIL', () => {
    const number = 183;
    const numRuleExcell = 24;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test('Supprimer la zone 309 une fois la correction demandée effectuée', () => {
    const number = 309;
    const numRuleExcell = 46;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Supprimer la zone 309 une fois la correction demandée effectuée FAIL', () => {
    const number = 309;
    const numRuleExcell = 46;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test('Mention d\'auteur obligatoire', () => {
    const number = '7XX';
    const numRuleExcell = 85;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Mention d\'auteur obligatoire FAIL', () => {
    const number = '7XX';
    const numRuleExcell = 85;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test('Zones 7XX : lier à une notice d\'autorité', () => {
    const number = '7XX_3';
    const numRuleExcell = 86;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Zones 7XX : lier à une notice d\'autorité FAIL', () => {
    const number = '7XX_3';
    const numRuleExcell = 86;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================

test('Zone 200$d : à remplacer par les zones 181, 182 et 183', () => {
    const number = '200_b';
    const numRuleExcell = 27;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Zone 200$d : à remplacer par les zones 181, 182 et 183 FAIL', () => {
    const number = '200_b';
    const numRuleExcell = 27;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================
test('Zone 210 à remplacer par 214 (document en main)', () => {
    const number = 210;
    const numRuleExcell = 32;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Zone 210 à remplacer par 214 (document en main) FAIL', () => {
    const number = 210;
    const numRuleExcell = 32;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================
test('Zone 328 : revoir la valeur des indicateurs', () => {
    const number = 328;
    const numRuleExcell = 117;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Zone 328 : revoir la valeur des indicateurs FAIL', () => {
    const number = 328;
    const numRuleExcell = 117;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================
test('Zone 328 incohérente avec le statut de la thèse : une reproduction doit contenir la sous-zone $z', () => {
    const number = '328_z';
    const numRuleExcell = 118;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Zone 328 incohérente avec le statut de la thèse : une reproduction doit contenir la sous-zone $z FAIL', () => {
    const number = '328_z';
    const numRuleExcell = 118;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================
test('Zone 455 incompatible avec le type de thèse (soutenance)', () => {
    const number = 455;
    const numRuleExcell = 145;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);

    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Zone 455 incompatible avec le type de thèse (soutenance) FAIL', () => {
    const number = 455;
    const numRuleExcell = 145;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).not.toStrictEqual([]);
});

// ===============================================================
test('Zone 456 incompatible avec le type de thèse (reproduction)', () => {
    const number = 456;
    const numRuleExcell = 147;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Zone 456 incompatible avec le type de thèse (reproduction) FAIL', () => {
    const number = 456;
    const numRuleExcell = 147;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
test('Ressource électronique : doit contenir une zone 303', () => {
    const number = 303;
    const numRuleExcell = 155;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Ressource électronique : doit contenir une zone 303 FAIL', () => {
    const number = 303;
    const numRuleExcell = 155;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
test('Ressource électronique : doit contenir une zone 339', () => {
    const number = 339;
    const numRuleExcell = 156;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Ressource électronique : doit contenir une zone 339 FAIL', () => {
    const number = 339;
    const numRuleExcell = 156;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).not.toStrictEqual([]);
});


// ===============================================================
test('Zone 608 : indexation Forme-Genre obligatoire (PPN 027253139)', () => {
    const number = 608;
    const numRuleExcell = 126;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).toStrictEqual([]);
});
// ===============================================================

test('Zone 608 : indexation Forme-Genre obligatoire (PPN 027253139) FAIL', () => {
    const number = 608;
    const numRuleExcell = 126;
    const nameFile = number;
    const PPN = getPPN(nameFile + '/' + nameFile + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    addRuleToTest(numRuleExcell);
    Structurel.testMatchStructurelRules(CATEGORIE,ruleTest,undefined,datafields,resultJson);
    
    expect(resultJson.errors).not.toStrictEqual([]);
});
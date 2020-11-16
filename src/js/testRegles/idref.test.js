const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const IdRef = require("../regles/IdRef");
import "@babel/polyfill";
import rules from '../../../serveur/public/model_regles.json';

let CATEGORIE;

beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function getPPN(link) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'idRef/' + link), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

function testError(errorMessage , resultJson) {
    for( let i in resultJson.errors) {
        console.log(resultJson.errors[i].message , "    " , errorMessage , "      " , errorMessage === resultJson.errors[i].message)
        if(errorMessage == resultJson.errors[i].message) {
            return true
        }
    }
    return false
}




test("69 : Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité", async () => {
    const indexExcell = 69;
    const PPN = getPPN(indexExcell + '/' + indexExcell + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    await IdRef.testIdRefRules(CATEGORIE,rules,undefined,datafields , resultJson)
    //testError("Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité" , resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("69 : Incohérence zone 7XX : vérifier l'étiquette et le type de notice d'autorité (FAIL)", async () => {
    const indexExcell = 69;
    const PPN = getPPN(indexExcell + '/' + indexExcell + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    await IdRef.testIdRefRules(CATEGORIE,rules,undefined,datafields , resultJson)
    //expect(resultJson.errors).not.toStrictEqual([]);
});

test("48 : Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité", async () => {
    const indexExcell = 48;
    const PPN = getPPN(indexExcell + '/' + indexExcell + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    await IdRef.testIdRefRules(CATEGORIE,rules,undefined,datafields , resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("48 : Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité (FAIL)", async () => {
    const indexExcell = 48;
    const PPN = getPPN(indexExcell + '/' + indexExcell + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    await IdRef.testIdRefRules(CATEGORIE,rules,undefined,datafields , resultJson)
    console.log(resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});

test("50 : Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité", async () => {
    const indexExcell = 50;
    const PPN = getPPN(indexExcell + '/' + indexExcell + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    await IdRef.testIdRefRules(CATEGORIE,rules,undefined,datafields , resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});

test("50 : Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité (FAIL)", async () => {
    const indexExcell = 50;
    const PPN = getPPN(indexExcell + '/' + indexExcell + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    await IdRef.testIdRefRules(CATEGORIE,rules,undefined,datafields , resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


test("52 : Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité", async () => {
    const indexExcell = 52;
    const PPN = getPPN(indexExcell + '/' + indexExcell + '.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    await IdRef.testIdRefRules(CATEGORIE,rules,undefined,datafields , resultJson)
    expect(resultJson.errors).toStrictEqual([]);

    
});

test("52 : Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité (FAIL)", async () => {
    const indexExcell = 52;
    const PPN = getPPN(indexExcell + '/' + indexExcell + '_Fail.xml');
    const datafields = PPN.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    await IdRef.testIdRefRules(CATEGORIE,rules,undefined,datafields , resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


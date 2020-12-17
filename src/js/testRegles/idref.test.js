const convert = require("xml-js");
const path = require('path');
const fs = require('fs');
const IdRef = require("../regles/IdRef");
// import "@babel/polyfill";
import rules from '../../../serveur/public/model_regles.json';

let CATEGORIE;

beforeAll(() => {
    CATEGORIE = "Generale"
});

afterAll(() => {
});

function getXML(link) {
    const xmlPPN = fs.readFileSync(path.join(__dirname, 'idRef/' + link), 'utf8');
    return JSON.parse(convert.xml2json(xmlPPN, { compact: true, spaces: 2 }));
}

// function testIdRefRules(categorie, rules, idrule, idref, datafields, resultJson) {
//     rules[categorie].idRef.forEach(function (regle) {
//         if (regle.index === idrule) {
//             if (IdRef.conditionNotice(datafields, regle)) {
//                 const identifiant = IdRef.identifiantNotice(datafields, regle)
//                 if (identifiant != null) {
//                     IdRef.validateIdRef(idref, regle, resultJson)
//                 } else {


//                     resultJson.errors.push({
//                         message: regle.message + " ( " + regle.index + " ) ",
//                         number: regle.number,
//                         code: regle.code
//                     });
//                 }
//             }
//         }
//     });
// }

function testIdRefRules(categorie, rules,idrule, idrefs, datafields, resultJson) {
    rules[categorie].idRef.forEach(function (regle) {
        if (regle.index === idrule) {
            const fieldsValid = IdRef.conditionNotice(datafields, regle)
            if (fieldsValid.length > 0) {
                const identifiant = IdRef.identifiantNotice(fieldsValid, regle)
                if (identifiant.length > 0) {
                    for (let i in idrefs) {
                        IdRef.validateIdRef(idrefs[i], regle, resultJson)
                    }
                } else {
                    IdRef.addError(regle, resultJson)
                }
            } 
        }
    });
}




test("58 : Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité", () => {
    const index = 58;
    const indexExcell = 58;
    const sudoc = getXML(indexExcell + '/' + indexExcell + '_pass_sudoc.xml');
    const idref = getXML(indexExcell + '/' + indexExcell + '_pass_idref.xml');
    const idrefs = []
    idrefs.push(idref)
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    testIdRefRules(CATEGORIE, rules, index, idrefs, datafields, resultJson)
    expect(resultJson.errors).toStrictEqual([]);
});



test("61 : Incohérence indexation : vérifier les zones 6XX et le type de notice d'autorité", () => {
    const index = 60;
    const indexExcell = 61;
    const sudoc = getXML(indexExcell + '/' + indexExcell + '_fail_sudoc.xml');
    const idref = getXML(indexExcell + '/' + indexExcell + '_fail_idref.xml');
    const idrefs = []
    idrefs.push(idref)
    const datafields = sudoc.record.datafield;
    let resultJson = {
        PPN: 0,
        errors: [],
    };
    testIdRefRules(CATEGORIE, rules, index, idrefs, datafields, resultJson)
    expect(resultJson.errors).not.toStrictEqual([]);
});


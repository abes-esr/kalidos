/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
const convert = require("xml-js");
const Matching = require("../../../js/regles/Matching");
const Structurel = require("../../../js/regles/Structurel");
const Dependance = require("../../../js/regles/Dependance");
const IdRef = require("../../../js/regles/IdRef");
import ConditionStructurel from "../../../js/regles/ConditionStructurelle";
import ConditionMatching from "../../../js/regles/ConditionMatching";
const ConditionDependance = require("../../../js/regles/ConditionDependance");
const Ordonnancement = require('../../../js/regles/Ordonnancement');
const Compte = require('../../../js/regles/Compte');

function testRegle({ row }) {
    const regle = row.regleInitial;
    const fakePPN = '<record>\n' +
        '   <leader> nlm0 22 450 </leader>\n' +
        '   <controlfield tag="001">exemple controlfield</controlfield>\n' +
        '   <controlfield tag="002">exemple controlfield 2</controlfield>\n' +
        '   <datafield tag="001" ind1=" " ind2=" ">\n' +
        '       <subfield code="a">exemple subfield</subfield>\n' +
        '   </datafield>\n' +
        '   <datafield tag="002" ind1=" " ind2=" ">\n' +
        '       <subfield code="a">exemple subfield 2</subfield>\n' +
        '   </datafield>\n' +
        '</record>';

    const testOnCategorie = (rule, controlfields, datafields, resultJson, getNoticeStructurelle, getNoticeSMatching) => {
        const categorie = "Generale";
        Matching.testMatchRegexRules(categorie, rule, controlfields, datafields, resultJson);
        Structurel.testMatchStructurelRules(categorie, rule, controlfields, datafields, resultJson);
        Dependance.testMatchDependanceRules(categorie, rule, controlfields, datafields, resultJson);
        IdRef.testIdRefRules(categorie, rule, controlfields, datafields, resultJson);
        ConditionStructurel.testConditionStrucutrelRules(categorie, rule, controlfields, datafields, resultJson, getNoticeStructurelle);
        ConditionMatching.testConditionMatchingRules(categorie, rule, controlfields, datafields, resultJson, getNoticeSMatching);
        ConditionDependance.testConditionDependanceRules(categorie, rule, controlfields, datafields, resultJson);
        Ordonnancement.testOrdonnancementRules(categorie, rule, controlfields, datafields, resultJson);
        Compte.testCompteRules(categorie, rule, controlfields, datafields, resultJson);
    }

    const verification = (rule, data) => {
        try {
            const controlfields = data.record.controlfield;
            const datafields = data.record.datafield;
            let resultJson = {
                PPN: "fakePPN",
                errors: [],
            };


            const getNoticeStructurelle = ConditionStructurel.getDataOnSudoc;
            const getNoticeSMatching = ConditionMatching.getDataOnSudoc;
            testOnCategorie(rule, controlfields, datafields, resultJson, getNoticeStructurelle, getNoticeSMatching)

            const resultatTest = document.getElementById("resultatTest");
            let message = "Le test est passé";
            if (resultJson.errors.length > 0) {
                message = "Le test a échoué";
            }
            resultatTest.innerHTML = message;

        } catch {
            document.getElementById("resultatTest").innerHTML = "erreur inconnue";
        }


    }

    const verifierRegle = () => {
        try {
            const xmlStr = document.getElementById("fakePPN").value;
            const data = JSON.parse(
                convert.xml2json(xmlStr, { compact: true, spaces: 2 })
            );
            const type = row.index.split("_")[1];
            const rule = {
                "Generale":
                {
                    "matching": [],
                    "dependances": [],
                    "ConditionMatching": [],
                    "ConditionStructurel": [],
                    "ConditionDependance": [],
                    "Structurel": [],
                    "idRef": [],
                    "ordonnancement": [],
                    "compte": [],
                    "precedence": []
                }
            };
            rule["Generale"][type].push(row.regleInitial);

            verification(rule, data);

        } catch {
            document.getElementById("resultatTest").innerHTML = "Un problème a été détécté sur le fake PPN (erreur sur l'écriture du XML)";
        }
    }

    return (
        <div>
            <Row>
                <Col>
                    <label htmlFor="fakePPN">Fake PPN à renseigner pour le test</label>
                </Col>
                <Col>
                    <label htmlFor="rulesJson">JSON de la règle à tester</label>
                </Col>
            </Row>
            <Row>
                <Col>
                    <textarea id="fakePPN" style={{width:"100%"}} defaultValue={fakePPN} rows="15" />
                </Col>
                <Col>
                    <textarea id="rulesJson" style={{width:"100%"}} defaultValue={JSON.stringify(regle, null, '\t')} rows="15" disabled />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" style={{marginTop:"3%"}} onClick={verifierRegle}>Vérifier la règle</Button>
                </Col>
                <Col>
                    <p style={{ fontWeight: "bold" }}>Résultat du test : </p><span id="resultatTest">Pas encore de test</span>
                </Col>
            </Row>
        </div>
    );
}

export default testRegle;

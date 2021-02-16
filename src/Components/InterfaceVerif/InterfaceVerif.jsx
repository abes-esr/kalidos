import React from 'react';
import Card4 from '../Générique/Card_4';
import Card8 from '../Générique/Card_8';
import Card12 from '../Générique/Card_12_Danger';
import TabPPN from './TabPPN';
import TabPPNError from './TabPPNError';
import { connect } from 'react-redux';
import { MDBIcon } from 'mdbreact';
import { Button, Tooltip, OverlayTrigger, Row, Col } from 'react-bootstrap';
import { CSVLink, CSVDownload } from "react-csv";


const mapStateToProps = (state) => ({
    result: state.result,
    recherchePPN: state.displayVerif.recherchePPN,
    compteurResult: state.compteurResult,
    listPPNErronne: state.listPPNErronne
});

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Générer excel avec descriptif complet
    </Tooltip>
);

const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Générer excel à double entrée
    </Tooltip>
);

function InterfaceVerif({ result, recherchePPN, compteurResult, listPPNErronne }) {
    const data_verif = Object.keys(result).map((key) => [Number(key), result[key]]);

    const listPPNWithError = data_verif.filter((row) => { return row[1].errors.length });
    const listPPNWithoutError = data_verif.filter((row) => row[1].errors.length < 1);

    const listPPNWithGoodName = listPPNWithError.filter((row) => { return row[1].PPN.toString().includes(recherchePPN) });

    //old excel
    const headers = [
        { label: "PPN", key: "ppn" },
        { label: "Erreurs", key: "error" },
        { label: "Message", key: "message" },
        { label: "Number", key: "number" },
        { label: "Code", key: "code" }
    ];

    const csvData = [];
    for (let i = 0; i < listPPNWithError.length; i++) {
        let error_number = listPPNWithError[i][1]['errors'].length;

        for (let j = 0; j < error_number; j++) {
            if (j == 0) {
                csvData.push({
                    ppn: listPPNWithError[i][1]['PPN'],
                    error: error_number,
                    message: listPPNWithError[i][1]['errors'][j]['message'],
                    number: listPPNWithError[i][1]['errors'][j]['number'],
                    code: listPPNWithError[i][1]['errors'][j]['code'],
                })
            } else {
                csvData.push({
                    ppn: "",
                    error: "",
                    message: listPPNWithError[i][1]['errors'][j]['message'],
                    number: listPPNWithError[i][1]['errors'][j]['number'],
                    code: listPPNWithError[i][1]['errors'][j]['code'],
                })
            }
        }
    }

    for (let i = 0; i < listPPNWithoutError.length; i++) {
        csvData.push({ ppn: listPPNWithoutError[i][1]['PPN'], error: "0", message: "", number: "", code: "" })
    }

    // new excel

    //on crée une liste des erreurs présentes dans les ppn
    const errorHeaders = [""];

    for (let i = 0; i < listPPNWithError.length; i++) {
        let error_number = listPPNWithError[i][1]['errors'].length;
        for (let j = 0; j < error_number; j++) {
            errorHeaders.push(
                listPPNWithError[i][1]['errors'][j]['number'] + " " + listPPNWithError[i][1]['errors'][j]['code']
            )
        }
    }
    //on élimine les erreurs redondantes
    const sortedHeaders = errorHeaders.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);

    //la liste des erreurs va constituer le header du excel
    const newCsvData = [];
    newCsvData.push(sortedHeaders);

    for (let i = 0; i < listPPNWithError.length; i++) {
        let error_number = listPPNWithError[i][1]['errors'].length;

        for (let j = 0; j < error_number; j++) {
            let ppnError = listPPNWithError[i][1]['errors'][j]['number'] + " " + listPPNWithError[i][1]['errors'][j]['code'];

            // on regarde à quel index du header l'erreur du ppn correspond
            let indexError = sortedHeaders.indexOf(ppnError);

            if (indexError > 0) {
                if (j == 0) {
                    let excelRow = [listPPNWithError[i][1]['PPN']];
                    for (let k = 1; k < sortedHeaders.length; k++) {
                        excelRow.push("");
                    }
                    // on se sert de cette index pour cocher la bonne case
                    excelRow[indexError] = "X";
                    newCsvData.push(excelRow);
                } else {
                    //éviter redondance des ppn
                    let excelRow = newCsvData.pop();
                    excelRow[indexError] = "X";
                    newCsvData.push(excelRow);
                }
            }
        }
    }

    for (let i = 0; i < listPPNWithoutError.length; i++) {
        newCsvData.push([listPPNWithoutError[i][1]['PPN'], ""]);
    }

    return (
        <div>
            <Row>
                <Col>
                    <h2>
                        Interface de Verification
                </h2>
                </Col>
                <Col>
                    <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>

                        <CSVLink data={csvData} filename={"recap_erreurs_completBU.csv"} separator={";"} headers={headers} style={{ margin: "1%", width: "48%", float: "left" }}>
                            <Button variant="success" style={{ width: "100%" }}>
                                <MDBIcon far icon="file-excel" />
                            &nbsp; Descriptif complet
                        </Button >
                        </CSVLink>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip2}>

                        <CSVLink data={newCsvData} filename={"recap_erreursBU.csv"} separator={";"} style={{ margin: "1%", width: "48%", float: "right" }}>
                            <Button variant="success" style={{ width: "100%" }}>
                                <MDBIcon far icon="file-excel" />
                            &nbsp; Double entrée
                        </Button>
                        </CSVLink>
                    </OverlayTrigger>
                </Col>
            </Row>
            <br></br>
            <Row>
                {
                    listPPNErronne.length > 0 ?
                        <Card12 title={'Liste de PPN inexistants'} content={<div>{listPPNErronne.join(" / ")}</div>} /> :
                        <div></div>
                }
            </Row>
            <Row>
                <Card4 title={'Erreurs par PPN'} content={<TabPPN listPPN={listPPNWithGoodName} />} />
                <Card8 title={'Détail des erreurs par PPN'} content={<TabPPNError result={result} />} />
            </Row>
        </div>
    );
}

export default connect(mapStateToProps)(InterfaceVerif);

import React from 'react';
import Card4 from '../Générique/Card_4';
import Card8 from '../Générique/Card_8';
import Card12 from '../Générique/Card_12_Danger';
import TabPPN from './TabPPN';
import TabPPNError from './TabPPNError';
import { connect } from 'react-redux';
import { MDBIcon } from 'mdbreact';
import { Button, Tooltip, OverlayTrigger, Row } from 'react-bootstrap';
import { CSVLink, CSVDownload } from "react-csv";


const mapStateToProps = (state) => ({
    result: state.result,
    recherchePPN: state.displayVerif.recherchePPN,
    compteurResult: state.compteurResult,
    listPPNErronne: state.listPPNErronne,
});

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Génération d'un fichier excel
    </Tooltip>
);

function InterfaceVerif({ result, recherchePPN, compteurResult, listPPNErronne }) {
    const data_verif = Object.keys(result).map((key) => [Number(key), result[key]]);

    const listPPNWithError = data_verif.filter((row) => { return row[1].errors.length });
    const listPPNWithoutError = data_verif.filter((row) => row[1].errors.length < 1);

    const listPPNWithGoodName = listPPNWithError.filter((row) => { return row[1].PPN.toString().includes(recherchePPN) });

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

    return (
        <div>
            <h2>
                Interface de Verification

                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >

                    <CSVLink data={csvData} headers={headers} style={{ float: "right" }}>
                        <Button variant="success">
                            <MDBIcon far icon="file-excel" />
                        </Button>
                    </CSVLink>
                </OverlayTrigger>
            </h2>
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


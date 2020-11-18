import React from 'react';
import Card4 from '../Générique/Card_4';
import Card8 from '../Générique/Card_8';
import TabPPN from './TabPPN';
import TabPPNError from './TabPPNError';
import { connect } from 'react-redux';
import { MDBIcon } from 'mdbreact';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { CSVLink, CSVDownload } from "react-csv";
import json2csv from "json2csv";


const mapStateToProps = (state) => ({
    result: state.result,
    recherchePPN: state.displayVerif.recherchePPN,
    compteurResult: state.compteurResult,
});

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Génération d'un fichier excel
    </Tooltip>
);

function InterfaceVerif({ result, recherchePPN, compteurResult }) {
    const data_verif = Object.keys(result).map((key) => [Number(key), result[key]]);

    const listPPNWithError = data_verif.filter((row) => { return row[1].errors.length });
    const listPPNWithoutError = data_verif.filter((row) => row[1].errors.length < 1);

    const listPPNWithGoodName = listPPNWithError.filter((row) => { return row[1].PPN.toString().includes(recherchePPN) });

    const headers = [
        { label: "PPN", key: "ppn" },
        { label: "Erreur", key: "error" },
        { label: "Message", key: "message" },
        { label: "Number", key: "number" },
        { label: "Code", key: "code" }
    ];
    
    const csvData = [];
    for (let i=0; i<listPPNWithError.length; i++ ) {
        let error_number = listPPNWithError.[i].[1].['errors'].length;

        for (let j=0; j<error_number; j++) {
            csvData.push( {  
                ppn: listPPNWithError.[i].[1].['PPN'], 
                error: error_number, 
                message: listPPNWithError.[i].[1].['errors'].[0].['message'],
                number: listPPNWithError.[i].[1].['errors'].[0].['number'],
                code: listPPNWithError.[i].[1].['errors'].[0].['code'],
            } )
        }
    }

    for (let i=0; i<listPPNWithoutError.length; i++ ) {
        csvData.push( {  ppn: listPPNWithoutError.[i].[1].['PPN'], error: "0", message: "", number: "", code: "" } )
    }
    
    return (
        <div>
            <h2>
                Interface de Verification

                <CSVLink data={csvData} headers={headers}> Download me </CSVLink>;
            </h2>
            <br></br>
            <div className="row">
                <Card4 title={'Tableau PPN'} content={<TabPPN listPPN={listPPNWithGoodName} />} />
                <Card8 title={'Erreur sur le PPN'} content={<TabPPNError result={result} />} />
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(InterfaceVerif);


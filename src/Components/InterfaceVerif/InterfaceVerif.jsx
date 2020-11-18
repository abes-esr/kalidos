import React from 'react';
import Card4 from '../Générique/Card_4';
import Card8 from '../Générique/Card_8';
import TabPPN from './TabPPN';
import TabPPNError from './TabPPNError';
import { connect } from 'react-redux';
import { MDBIcon } from 'mdbreact';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import CsvDownload from 'react-json-to-csv';


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
    console.log(result);
    const data_verif = Object.keys(result).map((key) => [Number(key), result[key]]);
    console.log(data_verif);

    const listPPNWithError = data_verif.filter((row) => { return row[1].errors.length });
    console.log(listPPNWithError);

    const listPPNWithGoodName = listPPNWithError.filter((row) => { return row[1].PPN.toString().includes(recherchePPN) });
    console.log(listPPNWithGoodName);

    return (
        <div>
            <h2>
                Interface de Verification
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >
                    {/**/}

                    <CsvDownload data={data_verif} filename="verif_data.csv" style={{ float : "right" }}>
                        <Button variant="success">
                            <MDBIcon far icon="file-excel" />
                        </Button>
                    </CsvDownload>
                </OverlayTrigger>
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


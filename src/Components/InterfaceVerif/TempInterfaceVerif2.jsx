import React from 'react';
import Card4 from '../Générique/Card_4';
import Card8 from '../Générique/Card_8';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, ListGroup, Table, Badge, Row } from 'react-bootstrap';
import { setPPNDisplay, setNumPage, setRecherchePPN } from '../../actions/index';
import Pagination from '@material-ui/lab/Pagination';

import style from '../../style.css';

const mapStateToProps = (state) => ({
    result: state.result,
    compteurResult: state.compteurResult,
    PPNDisplay: state.displayVerif.PPNDisplay,
    numPage: state.displayVerif.numPage,
    recherchePPN: state.displayVerif.recherchePPN,
});


const mapDispatchToProps = (dispatch) => ({
    SetPPNDisplay: (PPN) => dispatch(setPPNDisplay(PPN)),
    SetNumPage: (event, numPage) => dispatch(setNumPage({
        event: event,
        numPage: numPage
    })),
    SetRecherchePPN: () => dispatch(setRecherchePPN(
        document.getElementById('recherchePPN').value
    )),
});

let idListGroup = 0;

function TabPPN({ listPPN, SetPPNDisplay, SetNumPage, numPage, SetRecherchePPN, PPNDisplay }) {
    const nbElemParPage = 10;
    let nbPageTotal = listPPN.length / nbElemParPage;
    nbPageTotal = nbPageTotal > parseInt(nbPageTotal) ? parseInt(nbPageTotal) + 1 : parseInt(nbPageTotal);

    let debutListePPNDisplay = numPage == 1 ? 0 : (numPage - 1) * nbElemParPage;
    const finListePPNDisplay = numPage * nbElemParPage;
    const listPPNPDisplay = listPPN.slice(debutListePPNDisplay, finListePPNDisplay);

    return (
        <div>
            <Row className="justify-content-md-center" style={{ marginBottom: '3%' }}>

                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars"></i>
                </button>

                <form
                    className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
                    style={{ border: '1px solid #e3e6f0', borderRadius: '.35rem' }}
                >
                    <div className="input-group">
                        <input type="text"
                            className="form-control bg-light border-0 small"
                            id="recherchePPN"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            onChange={() => SetRecherchePPN()}>
                        </input>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </Row>
            <Card style={{ width: '18rem' }}>
                <ListGroup variant="flush">
                    {
                        listPPNPDisplay.map((row) => {
                            idListGroup++;
                            let styleBackground = {};
                            if (PPNDisplay == row[1].PPN) {
                                styleBackground = {
                                    backgroundColor: '#f2f2f2',
                                    color:'#757A8C',
                                    fontWeight:'bold',
                                }
                            }
                            return (
                                <ListGroup.Item key={idListGroup}
                                    onClick={() => SetPPNDisplay(row[1].PPN)}
                                    className={'listGroupPPN'}
                                    style={styleBackground}
                                >
                                    {row[1].PPN}
                                    <Badge style={{ float: "right", fontSize: '100%' }}
                                        variant="danger">{row[1].errors.length}</Badge>
                                </ListGroup.Item>
                            );
                        }
                        )
                    }
                </ListGroup>
            </Card>
            <br />
            <Row className="justify-content-md-center">
                <Pagination
                    siblingCount={0}
                    count={nbPageTotal}
                    page={numPage}
                    onChange={(event, _numPage) => SetNumPage(event, _numPage)}
                />
            </Row>
        </div>
    );
}

let idTrTabPPNError = 0;
function TabPPNError({ result, PPNDisplay }) {
    if (PPNDisplay === 0) {
        return ('');
    }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Message d'erreur</th>
                    <th>Numéro</th>
                    <th>Code</th>
                </tr>
            </thead>
            <tbody>
                {
                    result[PPNDisplay].errors.map((error) => {
                        idTrTabPPNError++;
                        return (
                            <tr key={idTrTabPPNError}>
                                <td>{error.message}</td>
                                <td>{error.number}</td>
                                <td>{error.code}</td>
                            </tr>);
                    })
                }
            </tbody>
        </Table>
    );
}


function TempInterfaceVerif({ result, PPNDisplay, SetPPNDisplay, SetNumPage, numPage, SetRecherchePPN, recherchePPN }) {
    const data = Object.keys(result).map((key) => [Number(key), result[key]]);
    const listPPNWithError = data.filter((row) => { return row[1].errors.length });
    const listPPNWithGoodName = listPPNWithError.filter((row) => { return row[1].PPN.toString().includes(recherchePPN) });
    return (
        <div>
            <h2>Interface de Verification</h2>
            <br></br>
            <div className="row">
                <Card4 title={'Tableau PPN'} content={
                    <TabPPN
                        listPPN={listPPNWithGoodName}
                        SetNumPage={SetNumPage}
                        numPage={numPage}
                        SetPPNDisplay={SetPPNDisplay}
                        SetRecherchePPN={SetRecherchePPN}
                        PPNDisplay={PPNDisplay}
                    />
                } />
                <Card8 title={'Erreur sur le PPN'} content={<TabPPNError result={result} PPNDisplay={PPNDisplay} />} />
            </div>
        </div>
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TempInterfaceVerif));


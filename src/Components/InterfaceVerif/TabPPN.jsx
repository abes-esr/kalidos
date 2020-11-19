import { Card, ListGroup, Badge, Row, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import Pagination from '@material-ui/lab/Pagination';
import style from '../../style.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import { setPPNDisplay, setNumPage, setRecherchePPN } from '../../actions/index';


const mapStateToProps = (state) => ({
    PPNDisplay: state.displayVerif.PPNDisplay,
    numPage: state.displayVerif.numPage,
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

function tooltipPPN({nombrePPNTotal, nombreErreurTotal}) {
    return(
        <Tooltip id="button-tooltip">
            Nombre de PPN erroné(s) : {nombrePPNTotal}
            <br />
            Nombre d'erreur(s) total : {nombreErreurTotal}
        </Tooltip>
    )
}


function TabPPN({ listPPN, SetPPNDisplay, SetNumPage, numPage, SetRecherchePPN, PPNDisplay }) {
    const nombrePPNTotal = listPPN.length;
    window.toto = listPPN;
    const nombreErreurTotal = nombrePPNTotal === 0 ? 0 : listPPN.map(x => x[1].errors.length).reduce((total, x) => total + x);
    const nbElemParPage = 10;
    let nbPageTotal = listPPN.length / nbElemParPage;
    nbPageTotal = nbPageTotal > parseInt(nbPageTotal) ? parseInt(nbPageTotal) + 1 : parseInt(nbPageTotal);

    let debutListePPNDisplay = numPage == 1 ? 0 : (numPage - 1) * nbElemParPage;
    const finListePPNDisplay = numPage * nbElemParPage;
    const listPPNPDisplay = listPPN.slice(debutListePPNDisplay, finListePPNDisplay);

    return (
        <div>
            <Row className="justify-content-md-center" style={{ marginBottom: '3%' }}>

                <form
                    className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
                    style={{ border: '1px solid #e3e6f0', borderRadius: '.35rem' }}
                >
                    <div className="input-group">
                        <input type="text"
                            className="form-control bg-light border-0 small"
                            id="recherchePPN"
                            placeholder="Recherche..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            onChange={SetRecherchePPN}>
                        </input>
                        <div className="input-group-append">
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={tooltipPPN({nombrePPNTotal, nombreErreurTotal})}
                            >
                                <Button className="btn btn-primary">
                                    <i className="fas fa-search fa-sm"></i>
                                </Button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </form>
            </Row>

            <Card style={{ width: '18rem', maxWidth: '100%' }}>
                <ListGroup variant="flush">
                    {
                        listPPNPDisplay.map((row) => {
                            idListGroup++;
                            let styleBackground = {};
                            if (PPNDisplay == row[1].PPN) {
                                styleBackground = {
                                    backgroundColor: '#f2f2f2',
                                    color: '#757A8C',
                                    fontWeight: 'bold',
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TabPPN));

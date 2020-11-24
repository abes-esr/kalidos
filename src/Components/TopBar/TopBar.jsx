
import React from 'react';
import { connect } from 'react-redux';
import { ProgressBar, Row, Col } from 'react-bootstrap';

const mapStateToProps = (state) => ({
    compteurResult: state.compteurResult,
    nombreTotalPPN: state.nombreTotalPPN,
    result: state.result,
    listPPNErronne: state.listPPNErronne,
});

function TopBar({ compteurResult, nombreTotalPPN, result, listPPNErronne }) {
    const width = parseInt(100 * compteurResult / nombreTotalPPN);
    const arrayResult = Object.keys(result).map((key) => [Number(key), result[key]]);
    const nombreErreurTotal = arrayResult.length === 0 ? 0 : arrayResult.map(x => x[1].errors.length).reduce((total, x) => total + x);
    let progressBar = '';

    if (compteurResult != nombreTotalPPN) {
        progressBar = <div className="progress" style={{ marginLeft: '17%', width: '66%' }}>
            <ProgressBar animated now={width} style={{ width: '100%', animationDuration: '0.01s' }} label={`${width}%`} />;
        </div>
    } else {
        progressBar = <Row style={{ marginLeft: '17%', width: '66%', fontWeight: 'bold' }}>
            <Col className="text-primary" style={{ textAlign: 'center' }}>
                Nombre de PPN testés : {nombreTotalPPN}
            </Col>
            <Col className="text-warning" style={{ textAlign: 'center' }}>
                Nombre d'erreurs totals : {nombreErreurTotal}
            </Col>
            <Col className="text-danger" style={{ textAlign: 'center' }}>
                Nombre de PPN inexistants : {listPPNErronne.length}
            </Col>
        </Row>;
    }
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {progressBar}
        </nav>
    );
}
export default connect(mapStateToProps)(TopBar);

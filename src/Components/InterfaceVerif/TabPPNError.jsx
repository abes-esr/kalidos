import React from 'react';
import { connect } from "react-redux";
import { Table } from 'react-bootstrap';

const mapStateToProps = (state) => ({
    result: state.result,
    PPNDisplay: state.displayVerif.PPNDisplay,
});

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

export default connect(mapStateToProps)(TabPPNError);

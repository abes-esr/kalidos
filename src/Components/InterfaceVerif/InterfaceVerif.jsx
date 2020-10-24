import React from 'react';
import Card4 from '../Générique/Card_4';
import Card8 from '../Générique/Card_8';
import TabPPN from './TabPPN';
import TabPPNError from './TabPPNError';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    result: state.result,
    recherchePPN: state.displayVerif.recherchePPN,
});

function InterfaceVerif({ result, recherchePPN }) {
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
                    />
                } />
                <Card8 title={'Erreur sur le PPN'} content={<TabPPNError result={result} />} />
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(InterfaceVerif);


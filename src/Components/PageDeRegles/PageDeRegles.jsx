import React from 'react';
import Card12 from '../Générique/Card_12';
import Table from './table/Table'

/**
 * Composant principal du site
 */
const PageDeRegles = () => (
    <div>
        <h2>
            Interface des règles
        </h2>
        <br></br>
        <div className="row">
            <Card12 title={'Jeu de règles'} content={<Table />} />
        </div>
    </div>
);

export default PageDeRegles;

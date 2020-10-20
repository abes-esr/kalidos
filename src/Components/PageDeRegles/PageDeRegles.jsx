import React from 'react';
import Card12 from '../Générique/Card_12';
import Table from './TableDeRegles';

const PageDeSaisie = () => (
    <div>
        <div className="row">
            <Card12 title={'Jeu de règles'} content={Table} />
        </div>
    </div>
);


export default PageDeSaisie;

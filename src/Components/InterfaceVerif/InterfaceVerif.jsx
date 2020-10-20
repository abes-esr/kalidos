import React from 'react';
import Card6 from '../Générique/Card_6';
import Card12 from '../Générique/Card_12';

const MessageErreur1 = () => (
    <div>
        <table class="table table-bordered" width="100%" cellspacing="0">
            <tr>
                <th>Message d'erreur</th>
                <th>Numéro</th> 
                <th>Code</th>
            </tr>
            <tr>
                <td>je suis un message</td>
                <td>200</td> 
                <td>b</td>
            </tr>
            <tr>
                <td>Comment ça va</td>
                <td>350</td> 
                <td>f</td>
            </tr>
        </table>
    </div>
);

const MessageErreur2 = () => (
    <div>
        <table class="table table-bordered" width="100%" cellspacing="0">
            <tr>
                <th>Message d'erreur</th>
                <th>Numéro</th> 
                <th>Code</th>
            </tr>
            <tr>
                <td>Bonjour</td>
                <td>500</td> 
                <td>c</td>
            </tr>
        </table>
    </div>
);

const InterfaceVerif = () => (
    <div>
        <h2>Interface de Verification</h2>
        <br></br>
        <div className="row">
            <Card6 title={'PPN : 12345'} content={MessageErreur1} />
            <Card6 title={'PPN : 6789'} content={MessageErreur2} />
        </div>
    </div>
);


export default InterfaceVerif;

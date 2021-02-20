import React from 'react';
import Card12 from '../Générique/Card_12';
import { verifiyRulesByTextArea } from '../../js/main/verifyRules'
import Dropzone from './Dropzone';

const SaisieManuelle = () => (
    <div>
        <div className="row">
            <div className="col-lg-12">
                <div className="form-group">
                    <label htmlFor='jeuDeRegles'>Choix du jeu de règles</label>
                    <select className="form-control" aria-describedby="basic-addon1" id="choixCategorie">
                        <option value="Generale" defaultValue>Générale</option>
                        <option value="Electronique">Monographie électronique</option>
                        <option value="MémoireSoutenance">Thèses et Mémoires (soutenance)</option>
                        <option value="MémoireReproduction">Thèses mémoires (reproduction)</option>
                        <option value="AutreDocuments">Monographies imprimées et autres documents</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="row">
            <div className='col-lg-12'>
                <div className="form-group">
                    <Dropzone />
                </div>
            </div>
        </div>
        <button type="button" className="btn btn-primary" style={{width:'100%'}} onClick={verifiyRulesByTextArea}>Envoyer</button>
    </div>
);





const PageDeSaisie = () => (
    <div>
        <h2>Saisie des identifiants</h2>
        <br></br>
        <div className="row">
            <Card12 title={'Saisie des identifiants'} content={SaisieManuelle()} />
        </div>
    </div>
);



export default PageDeSaisie;

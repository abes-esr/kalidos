import React from 'react';
import Card6 from '../Générique/Card_6';
import Card12 from '../Générique/Card_12';

const SaisieManuelle = () => (
    <div>
        <div className="row">
            <div className='col-lg-12'>
                <div className="form-group">
                    <label htmlFor="listePPN">Identifiants (PPN: 1 par ligne):</label>
                    <textarea placeholder="Saisissez votre liste de PPN!" className="form-control" id="listePPN" rows="10">
                    </textarea>
                </div>
            </div>
        </div>
        <button type="button" style={{width:'100%'}} className="btn btn-primary">Envoyer</button>
    </div>

);

const SaisieFichier = () => (
    <div>
        <form action="/upload" className="dropzone dz-clickable" id="my-dropzone">
            <div className="dz-message d-flex flex-column">
                <i className="material-icons text-muted">cloud_upload</i>
            Drag &amp; Drop dans la zone ou cliquez
          </div>
        </form>

        <br></br>

        <button type="button" className="btn btn-primary">Envoyer</button>
    </div>
);

const DropdownJeuDeRègles = () => (
    <div className="row">
        <div className="col-lg-12">
            <div className="form-group">
                <label htmlFor='jeuDeRegles'>Choix du jeu de règles</label>
                <select className="form-control" aria-describedby="basic-addon1" id="jeuDeRegles">
                    <option value="0" defaultValue>Choix automatique</option>
                    <option value="1">Encyclopédie</option>
                    <option value="2">Bibliographie</option>
                    <option value="3">Thèse</option>
                </select>
            </div>
        </div>
    </div>
);


const PageDeSaisie = () => (
    <div>
        <h2>Saisie des identifiants</h2>
        <br></br>
        <div className="row">
            <Card12 title={'Choix du jeu de règles'} content={DropdownJeuDeRègles} />
        </div>
        <div className="row">
            <Card6 title={'Saisie manuelle'} content={SaisieManuelle} />
            <Card6 title={'Saisie par fichier'} content={SaisieFichier} />
        </div>
    </div>
);


export default PageDeSaisie;

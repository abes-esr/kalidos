import React from 'react';
import Card6 from '../Générique/Card_6';
import Card12 from '../Générique/Card_12';
import { verifyRules, verifiyRulesByTextArea, verifyRulesByFile } from '../../js/verifyRules'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const SaisieManuelle = () => (
    <div>
        <div className="row">
            <div className='col-lg-12'>
                <div className="form-group">
                    <label htmlFor="listePPN">Identifiants (PPN: 1 par ligne):</label>
                    <textarea placeholder="Saisissez votre liste de PPN!" id="textAreaSaisie" className="form-control" rows="10">
                    </textarea>
                </div>
            </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={verifiyRulesByTextArea}>Envoyer</button>
    </div>

);

const SingleFileAutoSubmit = () => {
    const toast = (innerHTML) => {
        const el = document.getElementById('toast')
        el.innerHTML = innerHTML
        el.className = 'show'
        setTimeout(() => { el.className = el.className.replace('show', '') }, 3000)
    }

    const getUploadParams = ({ file, meta }) => {
        console.log(file);
        window.fileListPPN = file;
        // let reader = new FileReader();
        // reader.readAsText(file);
        // const listPPN = reader.result.split("\n");
        // console.log(listPPN);
        // verifyRulesByFile(file);

        console.log("end");
        return { url: '' }
    }

    const handleChangeStatus = ({ meta, remove }, status) => {
        if (status === 'headers_received') {
            toast(`${meta.name} uploaded!`)
            console.log(meta);
            console.log(remove);
            console.log(status);
        } else if (status === 'aborted') {
            toast(`${meta.name}, upload failed...`)
        }
    }

    return (
        <React.Fragment>
            <div id="toast">Upload</div>
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                maxFiles={1}
                multiple={false}
                canCancel={false}
                inputContent="Drop A File"
                styles={{
                    dropzone: { width: 400, height: 200 },
                    dropzoneActive: { borderColor: 'green' },
                }}
            />
        </React.Fragment>
    )
}

const SaisieFichier = () => (
    <div>
        <SingleFileAutoSubmit />
        <br></br>

        <button type="button" className="btn btn-primary" onClick={verifyRulesByFile} >Envoyer</button>
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
            <Card12 title={'Choix du jeu de règles'} content={DropdownJeuDeRègles()} />
        </div>
        <div className="row">
            <Card6 title={'Saisie manuelle'} content={SaisieManuelle()} />
            <Card6 title={'Saisie par fichier'} content={SaisieFichier()} />
            {/* {SaisieFichier()} */}
        </div>
    </div>
);



export default PageDeSaisie;

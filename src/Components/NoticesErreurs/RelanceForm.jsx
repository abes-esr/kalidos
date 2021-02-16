import React from "react";
import { connect } from "react-redux";
import { verifiyRulesByTextAreaNotice } from '../../js/main/verifyRules'

const mapStateToProps = (state) => ({
  noticeDisplay: state.displayVerif.noticeDisplay
});

function RelanceForm({ notices, noticeDisplay }) {
  if (noticeDisplay === 0 || notices[noticeDisplay] === undefined) {
    return "";
  }
  const listPPN = notices[noticeDisplay];
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <label htmlFor='jeuDeRegles'>Choix du jeu de règles</label>
            <select className="form-control" aria-describedby="basic-addon1" id="choixCategorie">
              <option value="Generale" defaultValue>Générale</option>
              <option value="Electronique">Electronique</option>
              <option value="MémoireSoutenance">Mémoire Soutenance</option>
              <option value="MémoireReproduction">Mémoire Reproduction</option>
              <option value="AutreDocuments">Autre Documents</option>
            </select>
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-primary" style={{width:'100%'}} onClick={() => verifiyRulesByTextAreaNotice(listPPN)}>Envoyer</button>
    </div>
  );
}

export default connect(mapStateToProps)(RelanceForm);

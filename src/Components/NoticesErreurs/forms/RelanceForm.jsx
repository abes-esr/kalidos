import React from "react";
import { connect } from "react-redux";
import { verifiyRulesByTextAreaNotice } from '../../../js/main/verifyRules'

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
              <option value="Electronique">Monographie électronique</option>
              <option value="MémoireSoutenance">Thèses et Mémoires (soutenance)</option>
              <option value="MémoireReproduction">Thèses mémoires (reproduction)</option>
              <option value="AutreDocuments">Monographies imprimées et autres documents</option>
            </select>
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-primary" style={{width:'100%'}} onClick={() => verifiyRulesByTextAreaNotice(listPPN)}>Envoyer</button>
    </div>
  );
}

export default connect(mapStateToProps)(RelanceForm);

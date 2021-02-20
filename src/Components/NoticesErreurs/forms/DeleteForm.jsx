import React from "react";
import { connect } from "react-redux";
import { deleteNotice } from "../notices";

const mapStateToProps = (state) => ({
  noticeDisplay: state.displayVerif.noticeDisplay
});

function RelanceForm({ notices, noticeDisplay }) {
  if (noticeDisplay === 0 || notices[noticeDisplay] === undefined) {
    return "";
  }
  return (
    <div>
      <p>Êtes-vous sûr ?</p>
      <br></br>
      <button type="button" className="btn btn-danger" style={{width:'100%'}} 
        onClick={() => deleteNotice(noticeDisplay)}>
        Supprimer
      </button>
    </div>
  );
}

export default connect(mapStateToProps)(RelanceForm);

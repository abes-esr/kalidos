import React from "react";
import { deleteAllNotices } from "../notices";

function DeleteHistoForm() {
  return (
    <div>
      <p>Êtes-vous sûr ?</p>
      <br></br>
      <button type="button" className="btn btn-danger" style={{width:'100%'}} 
        onClick={deleteAllNotices}>
        Supprimer
      </button>
    </div>
  );
}

export default DeleteHistoForm;

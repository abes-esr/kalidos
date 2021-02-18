import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { Delete } from '@material-ui/icons';
import Modal from './modals/Modal';
import ModalDelete from './modals/ModalDelete';
import RelanceForm from './forms/RelanceForm';
import DeleteForm from './forms/DeleteForm';


const mapStateToProps = (state) => ({
  noticeDisplay: state.displayVerif.noticeDisplay
});

let idTrTabPPNNotice = 0;
function TabPPNNotice({ notices, noticeDisplay }) {
  if (noticeDisplay === 0 || notices[noticeDisplay] === undefined) {
    return "";
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <span style={{display: "inline-block", marginRight:"10px"}} >
              <Modal
                button="Relancer le contrôle"
                title="Relancer le contrôle"
                body={<RelanceForm notices={notices} />}
              />
            </span>
            <span style={{display: "inline-block"}}>
              <ModalDelete
                button={<Delete htmlColor="#fff" fontSize="small" />}
                title="Supprimer la notice"
                body={<DeleteForm notices={notices} />}
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {notices[noticeDisplay].map((row) => {
          idTrTabPPNNotice++;
          return (
            <tr key={idTrTabPPNNotice}>
              <td>{row}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default connect(mapStateToProps)(TabPPNNotice);

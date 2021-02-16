import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import Modal from './modals/Modal';
import RelanceForm from './RelanceForm';

const mapStateToProps = (state) => ({
  noticeDisplay: state.displayVerif.noticeDisplay
});

let idTrTabPPNNotice = 0;
function TabPPNNotice({ notices, noticeDisplay }) {
  console.log('noticeDisplay', noticeDisplay);
  if (noticeDisplay === 0 || notices[noticeDisplay] === undefined) {
    return "";
  }
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Modal
              button="Relancer la notice"
              title="Relancer la notice"
              body={<RelanceForm notices={notices} />}
            />
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

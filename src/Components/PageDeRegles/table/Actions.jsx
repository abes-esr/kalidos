/* eslint-disable react/prop-types */
import React from 'react';
import FormJSON from '@rjsf/core';
import { Button } from 'react-bootstrap';
import { Edit, Delete, BugReport } from '@material-ui/icons';
import ArrayFieldTemplate from '../forms/ArrayFieldTemplate';
import Modal from '../modals/Modal';
import ModalTestRegle from '../modals/ModalTestRegle';
import TestRegle from '../testRegle/testRegle';

function Action({ row, types, editRule }) {
  const typeIndex = types.findIndex((t) => t.type === row.type);
  const { schema } = types[typeIndex];

  const onSubmit = ({ formData }, e) => {
    const obj = types[typeIndex].submit(formData);
    console.log(`Edit: ${obj}`);
    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'index': row.index,
      },
      body: JSON.stringify(obj)
    };

    fetch('/rules', requestOptions)
      .then(response => {
        switch (response.status) {
          case 200:
            alert("Règle edité!")
            console.log(row)
            obj.category = row.category
            obj.type = row.type
            obj.index = row.index
            editRule(obj)
            break;
          case 304:
            alert("Règle déjà existente")
            break;
          default:
            alert("Le type / categorie n'existent pas")
            break;
        }
      })
  };

  const deleted = function () {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'index': row.index,
      }
    };

    fetch('/rules', requestOptions)
      .then(response => {
        switch (response.status) {
          case 200:
            alert("Règle suprimé!")
            editRule({})
            break;
          default:
            alert("Le type / categorie n'existent pas")
            break;
        }
      })
  }

  const EditForm = () => (
    <FormJSON
      className="col-12"
      schema={schema}
      ArrayFieldTemplate={ArrayFieldTemplate}
      onSubmit={onSubmit}
    >
      <Button className="m-1" variant="primary" type="submit">Valider</Button>
    </FormJSON>
  );

  return (
    <div className="row">
      <div className="col-4 mx-auto" style={{padding:0}}>
        <Modal
          button={<Edit color="primary" fontSize="small" />}
          title="Edition"
          body={<EditForm />}
        />
      </div>
      <div className="col-4 mx-auto" style={{padding:0}}>
        <ModalTestRegle
          button={<BugReport color="action" fontSize="small" />}
          title="Tester la règle"
          body={<TestRegle row={row} />}
        />
      </div>
      <div className="col-4 mx-auto" style={{padding:0}}>
        <Modal
          button={<Delete color="error" fontSize="small" />}
          title="Supprimer"
          body="Êtes vous sûrs de vouloir supprimer cette régle ?"
          close="Annuler"
          accept="Supprimer"
          acceptFunc={deleted}
        />
      </div>
    </div>
  );
}

export default Action;

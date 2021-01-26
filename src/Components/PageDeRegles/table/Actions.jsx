/* eslint-disable react/prop-types */
import React from 'react';
import FormJSON from '@rjsf/core';
import { Button } from 'react-bootstrap';
import { Edit, Delete } from '@material-ui/icons';
import ArrayFieldTemplate from '../forms/ArrayFieldTemplate';
import Modal from '../modals/Modal';

function Action({ row, types }) {
  const typeIndex = types.findIndex((t) => t.type === row.type);
  const { schema } = types[typeIndex];

  const onSubmit = ({ formData }, e) => {
    const obj = types[typeIndex].submit(formData);
    console.log(`Edit: ${obj}`);
    console.log(e);
    // POST obj
    // refresh rules list
  };

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
      <div className="col-5 mx-auto">
        <Modal
          button={<Edit color="primary" fontSize="small" />}
          title="Edition"
          body={<EditForm />}
        />
      </div>
      <div className="col-5 mx-auto">
        <Modal
          button={<Delete color="error" fontSize="small" />}
          title="Supprimer"
          body="Êtes vous sûrs de vouloir supprimer cette régle ?"
          close="Annuler"
          accept="Supprimer"
        />
      </div>
    </div>
  );
}

export default Action;

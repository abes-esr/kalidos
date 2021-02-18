/* eslint-disable react/prop-types */
import React from 'react';
import FormJSON from '@rjsf/core';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Edit, Delete, BugReport } from '@material-ui/icons';
import ArrayFieldTemplate from '../forms/ArrayFieldTemplate';
import Modal from '../modals/Modal';
import ModalTestRegle from '../modals/ModalTestRegle';
import TestRegle from '../testRegle/testRegle';

function Action({ row, types, editRule, deleteRule }) {
  const typeIndex = types.findIndex((t) => t.type === row.type);
  const { schema } = types[typeIndex];

  function tooltipModifierRegle() {
    return (
      <Tooltip id="button-tooltip" style={{ margin: 0 }}>
        Modifier le contenu de la règle
      </Tooltip>
    )
  }


  function tooltipTesterRegle() {
    return (
      <Tooltip id="button-tooltip" style={{ margin: 0 }}>
        Tester la règle
      </Tooltip>
    )
  }


  function tooltipSupprimerRegle() {
    return (
      <Tooltip id="button-tooltip" style={{ margin: 0 }}>
        Supprimer la règle
      </Tooltip>
    )
  }


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

  const onAcceptDelete = function () {
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
            deleteRule(row.index)
            break;
          default:
            alert("Régle pas trouvé")
            break;
        }
      })
  }

  const EditForm = () => {
    let editSchema = schema
    delete editSchema.properties.category
    editSchema.required = editSchema.required.slice(1)
    return (
      <FormJSON
        className="col-12"
        schema={editSchema}
        ArrayFieldTemplate={ArrayFieldTemplate}
        onSubmit={onSubmit}
      >
        <Button className="m-1" variant="primary" type="submit">Valider</Button>
      </FormJSON>
    )
  };

  return (
    <div className="row">
      <div className="col-4 mx-auto" style={{ padding: 0 }}>
        <Modal
          button={
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 400 }}
              overlay={tooltipModifierRegle()}
            >
              <Edit color="primary" fontSize="small" />
            </OverlayTrigger>
          }
          title="Edition"
          body={<EditForm />}
        />
      </div>
      <div className="col-4 mx-auto" style={{ padding: 0 }}>
        <ModalTestRegle
          button={
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 400 }}
              overlay={tooltipTesterRegle()}
            >
              <BugReport color="action" fontSize="small" />
            </OverlayTrigger>}
          title="Tester la règle"
          body={<TestRegle row={row} />
          }
        />
      </div>
      <div className="col-4 mx-auto" style={{ padding: 0 }}>
        <Modal
          button={
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 400 }}
              overlay={tooltipSupprimerRegle()}
            >
              <Delete color="error" fontSize="small" />
            </OverlayTrigger>
          }
          title="Supprimer"
          body="Êtes vous sûrs de vouloir supprimer cette régle ?"
          close="Annuler"
          accept="Supprimer"
          acceptFunc={onAcceptDelete}
        />
      </div>
    </div>
  );
}

export default Action;

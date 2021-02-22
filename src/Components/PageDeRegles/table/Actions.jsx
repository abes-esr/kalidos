import React from 'react';
import FormJSON from '@rjsf/core';
import { OverlayTrigger, Tooltip, Button, Container, Row } from 'react-bootstrap';
import { Edit, Delete, BugReport } from '@material-ui/icons';
import ArrayFieldTemplate from '../forms/ArrayFieldTemplate';
import Modal from '../modals/Modal';
import ModalTestRegle from '../modals/ModalTestRegle';
import TestRegle from '../testRegle/testRegle';

/**
 * Composant qui gere les actions (edition, test, suppresion) sur chaque ligne
 * Affiche a la fin de chaque ligne
 * 
 * @param {
 *    row : la ligne dans le tableau des regles
 *    types : le type de la regle
 *    editRule : la fonction qui permet de supprimer une regle sur la liste
 *    deleteRule : la fonction qui permet de supprimer une regle sur la liste
 * } props 
 */
function Action({ row, types, editRule, deleteRule }) {
  const typeIndex = types.findIndex((t) => t.type === row.type);
  const { schema } = types[typeIndex];


  function tooltipTesterRegle() {
    return (
      <Tooltip id="button-tooltip" style={{ margin: 0 }}>
        Tester la règle
      </Tooltip>
    )
  }


  /**
   * La fonction qui est appellee quand on veut modifier une regle
   * 
   * @param {
   *    formData : Information rempli par l'utilisateur
   * } param0 
   * @param {*} e 
   */
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
            alert("Le type / categorie n'existe pas")
            break;
        }
      })
  };


  /**
   * La fonction qui permet de de valider la suppression d'une certaine regle
   */
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
            alert("Règle pas trouvé")
            break;
        }
      })
  }

  const EditForm = () => {
    let editSchema = schema
    delete editSchema.properties.category
    editSchema.required = editSchema.required.slice(1)
    if (row.type === "matching")
      row.number = String(row.number).split(',')

    return (
    <Container>
      <Row>
        <h6>Règle de type : {row.type}</h6>
      </Row>
      <Row>
        <FormJSON
          className="col-12"
          schema={editSchema}
          ArrayFieldTemplate={ArrayFieldTemplate}
          onSubmit={onSubmit}
          formData={row}
        >
          <Button className="m-1" variant="primary" type="submit">Valider</Button>
        </FormJSON>
      </Row>
  </Container>
  )};

  return (
    <div className="row">

      {/*********************************************************** 
       *                      BUTTON EDIT
       * **********************************************************/ }
      <div className="col-4 mx-auto" style={{ padding: 0 }}>
        <Modal
          icon={ <Edit color="primary" fontSize="small" />}
          overlay={
            <Tooltip id="button-tooltip" style={{ margin: 0 }}>
              Modifier le contenu de la règle
            </Tooltip>
          }
          title="Edition"
          body={<EditForm />}
        />
      </div>

      {/*********************************************************** 
       *                      BUTTON TEST
       * **********************************************************/ }
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

      {/*********************************************************** 
       *                      BUTTON DELETE
       * **********************************************************/ }
      <div className="col-4 mx-auto" style={{ padding: 0 }}>
        <Modal
          icon={<Delete color="error" fontSize="small" />}
          overlay={
            <Tooltip id="button-tooltip" style={{ margin: 0 }}>
              Supprimer la règle
            </Tooltip>
          }
          title="Supprimer"
          body="Êtes vous sûrs de vouloir supprimer cette règle ?"
          close="Annuler"
          accept="Supprimer"
          acceptFunc={onAcceptDelete}
        />
      </div>
    </div>
  );
}

export default Action;

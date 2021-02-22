import React, { useState } from 'react';
import FormJSON from '@rjsf/core';
import {
  Button, Card, Col, Container, ListGroup, Row,
} from 'react-bootstrap';
import ArrayFieldTemplate from '../forms/ArrayFieldTemplate';

/**
 * Composant d'ajout de regles a deux parties:
 *    List : qui propose la liste de regles disponibles avec une brief explication
 *    Form : le formulaire correspondant au type de regle choisi
 * Le changement entre ces parties est fait avec useForm (au depart a false)
 * @param {
 *   types : liste de types 
 *   newRule : la fonction qui permet de suajouterpprimer une regle sur la liste
 * } props 
 */
function Add({ types, newRule }) {
  
  const [useForm, setUseForm] = useState(false);
  const [index, setIndex] = useState(0);

  const handleTypeChange = (selectedType) => {
    setIndex(types.findIndex((t) => t.type === selectedType));
  };

  const handleSelectedType = () => {
    setUseForm(!useForm);
  };
  /**
   * La fonction qui est appellee quand on veut ajouter une regle
   * 
   * @param {
    *    formData : Information rempli par l'utilisateur
    * } param0 
    * @param {*} e 
    */
  const onSubmit = ({ formData }, e) => {
    const obj = types[index].submit(formData);
    console.log('Add');
    console.log(obj);
    const type = types[index].type;
    const category = formData.category;

    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'type': type,
        'categorie': category
      },
      body: JSON.stringify(obj)
    };

    fetch('/rules', requestOptions)
      .then(response => {
        switch (response.status) {
          case 200:
            alert("Nouvelle règle ajouté!")
            setUseForm(!useForm)
            obj.category = category
            obj.type = type
            newRule(obj)
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

  const Footer = () => (
    <Row className="justify-content-end">
      {useForm && <Button className="m-1" variant="primary" type="submit">Valider</Button>}
      <Button className="m-1" variant="secondary" onClick={() => handleSelectedType()}>
        { useForm ? 'Retour' : 'Suivant'}
      </Button>
    </Row>
  );
  
  /*********************************************************** 
   *                      FORMULAIRE
   * **********************************************************/
  const Form = () => (
    <Container>
      <Row>
        <h6>Règle de type : {types[index].type}</h6>
      </Row>
      <Row>
        <FormJSON
          className="col-12"
          schema={types[index].schema}
          ArrayFieldTemplate={ArrayFieldTemplate}
          onSubmit={onSubmit}
        >
          <Footer />
        </FormJSON>
      </Row>
    </Container>
  );

  /*********************************************************** 
  *                     LISTE DE REGLES
  * **********************************************************/
  const List = () => (
    <Container>
      <Row>
        <Col sm={3}>
          <ListGroup>
            {
              types.map((type) => (
                <ListGroup.Item key={type.type} action onClick={() => handleTypeChange(type.type)} className={'listGroupPPN'}>
                  {type.name}
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={types[index].gif} />
            <Card.Body>{types[index].description}</Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  );

  return (
    <Container sm={10}>
      { !useForm && <Row> Choisissez un type de règle : </Row>}
      <Row>
        { useForm ? <Form /> : <List /> }
      </Row>
    </Container>
  );
}

export default Add;

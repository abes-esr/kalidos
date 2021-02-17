import React, { useState } from 'react';
import FormJSON from '@rjsf/core';
import {
  Button, Card, Col, Container, ListGroup, Row,
} from 'react-bootstrap';
import ArrayFieldTemplate from '../forms/ArrayFieldTemplate';

function Add({ types, newRule }) {
  const [useForm, setUseForm] = useState(false);
  const [index, setIndex] = useState(0);

  const handleTypeChange = (selectedType) => {
    setIndex(types.findIndex((t) => t.type === selectedType));
  };

  const handleSelectedType = () => {
    setUseForm(!useForm);
  };

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
    // POST obj
    // refresh rules list
  };

  const Footer = () => (
    <Row className="justify-content-end">
      {useForm && <Button className="m-1" variant="primary" type="submit">Valider</Button>}
      <Button className="m-1" variant="secondary" onClick={() => handleSelectedType()}>
        { useForm ? 'Retour' : 'Suivant'}
      </Button>
    </Row>
  );

  const Form = () => (
    <FormJSON
      className="col-12"
      schema={types[index].schema}
      ArrayFieldTemplate={ArrayFieldTemplate}
      onSubmit={onSubmit}
    >
      <Footer />
    </FormJSON>
  );

  const List = () => (
    <Container>
      <Row>
        <Col>
          <ListGroup>
            {
              types.map((type) => (
                <ListGroup.Item key={type.type} action onClick={() => handleTypeChange(type.type)}>
                  {type.name}
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <Card.Body>{types[index].description}</Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  );

  return (
    <Container>
      { !useForm && <Row> Choisissez un type de régle : </Row>}
      <Row>
        { useForm ? <Form /> : <List /> }
      </Row>
    </Container>
  );
}

export default Add;

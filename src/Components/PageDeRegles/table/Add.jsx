import React, { useState } from 'react';
import FormJSON from '@rjsf/core';
import {
  Button, Card, Col, Container, ListGroup, Row,
} from 'react-bootstrap';
import ArrayFieldTemplate from '../forms/ArrayFieldTemplate';

function Add({ types }) {
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
    console.log(`Add: ${obj}`);
    console.log(e);
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

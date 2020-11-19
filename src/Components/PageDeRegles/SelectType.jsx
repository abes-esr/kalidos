import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap'
import FormJSON from "@rjsf/core";

const TypeList = () => {
  
  const [useForm, setUseForm] = useState(false)
  const [type, setType] = useState("matching")
  const [indexDesc, setIndexDesc] = useState(0)

  const types = [
    { name: "matching", type: "matching", description: "Description de matching" },
    { name: "dependances", type: "dependances", description: "Description de dependances" },
    { name: "Conditionnels", type: "Conditionnels", description: "Description de Conditionnels" },
    { name: "Structurel", type: "Structurel", description: "Description de Structurel" },
    { name: "idRef", type: "idRef", description: "Description de idRef" },
  ]

  const handleTypeChange = (selectedType) => {
    setType(selectedType)
    setIndexDesc(types.findIndex(t => t.type == selectedType))
  }

  const handleSelectedType = () => {
    setUseForm(!useForm)
  }

  // TEST 
  const schema = {
    title: "test", 
    type: "array",
  items: {
    type: "object",
    properties: {
        name: {
            type: "string"
        }
    }
  }
  };

  const uiSchema = {
    items: {
      "ui:widget": "textarea"
    }
  };

  const Form = () => (<Row><FormJSON schema={schema} uiSchema={uiSchema} /></Row>);

  const List = () => (
    <Row>
      <Col>
        <ListGroup>
          { 
            types.map( type => {
              return(
                <ListGroup.Item key={type.type} action onClick={() => handleTypeChange(type.type)}>
                  {type.name}
                </ListGroup.Item>
              );
            }) 
          }
        </ListGroup>
      </Col>
      <Col>
        <Card>
          <Card.Body>{types[indexDesc].description}</Card.Body>
        </Card>
      </Col>
    </Row>
  )


  return (
    <Container>
      { useForm ? <Form/> : <List/> }
      <Row className="p-1 justify-content-end">
        <Button onClick={() => handleSelectedType()}> { useForm ? "Back" : "Next"} </Button>
      </Row>
  </Container>
  );
}

export default TypeList;
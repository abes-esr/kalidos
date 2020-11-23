import React, { useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormJSON from "@rjsf/core";
import { getSchema } from './forms/matching'
import ArrayFieldTemplate from './forms/ArrayFieldTemplate'

const TypeList = ({categories}) => {
  
  const [useForm, setUseForm] = useState(false)
  const [type, setType] = useState("matching")
  const [indexDesc, setIndexDesc] = useState(0)

  const types = [
    { name: "Matching", type: "matching", description: "Description de matching" },
    { name: "Dependances", type: "dependances", description: "Description de dependances" },
    { name: "Conditionnels", type: "Conditionnels", description: "Description de Conditionnels" },
    { name: "Structurel", type: "Structurel", description: "Description de Structurel" },
    { name: "References", type: "idRef", description: "Description de idRef" },
  ]

  const rules = {
    rules: [
      "must contain",
      "must not contain",
      "equals to",
      "not equals to",
      "starts with",
      "not starts with",
      "ends with",
      "not ends with"
    ],
    names: [
      "Must contain",
      "Must not contain",
      "Equals to",
      "Not equals to",
      "Starts with",
      "Not starts with",
      "Ends with",
      "Not ends with"
    ]
  }

  const handleTypeChange = (selectedType) => {
    setType(selectedType)
    setIndexDesc(types.findIndex(t => t.type == selectedType))
  }

  const handleSelectedType = () => {
    setUseForm(!useForm)
  }

  const schema = getSchema(categories, rules)
  
  const onSubmit = ({formData}, e) => {
    console.log(type)
    console.log("Data submitted: ",  formData)
  }


  const Footer = () => (
    <Row className="justify-content-end">
      {useForm && <Button className="m-1" variant="primary" type="submit">Submit</Button>}
      <Button className="m-1" variant="secondary" onClick={() => handleSelectedType()}> { useForm ? "Back" : "Next"} </Button>
    </Row>
  )

  const Form = () => (
    <FormJSON 
      className="col-12"
      schema={schema}
      ArrayFieldTemplate={ArrayFieldTemplate}
      onSubmit={onSubmit}
    >
    { <Footer/>}
    </FormJSON>
  )

  const List = () => (
    <Container>
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
      <Footer/>
    </Container>
  )

  return (
    <Container>
      { !useForm && <Row> Chose a type of rule : </Row>}
      <Row>
        { useForm ? <Form/> : <List/> }
      </Row>
    </Container>
  );
}

export default TypeList;


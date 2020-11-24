import React, { useState } from 'react'
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormJSON from "@rjsf/core";
import { getSchemaMatching } from './forms/matching'
import ArrayFieldTemplate from './forms/ArrayFieldTemplate'
import { generator, applyRule } from './generator'


const TypeList = ({categories}) => {
  
  const [useForm, setUseForm] = useState(false)
  const [type, setType] = useState("matching")
  const [indexDesc, setIndexDesc] = useState(0)

  const types = [
    { name: "Matching", type: "matching", description: "Description du type matching" },
    { name: "Dépendances", type: "dependances", description: "Description du type dependances" },
    { name: "Conditionnels", type: "Conditionnels", description: "Description du type Conditionnels" },
    { name: "Structurels", type: "Structurel", description: "Description du type Structurel" },
    { name: "Références", type: "idRef", description: "Description du type idRef" },
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
      "not ends with",
      "characters number"
    ],
    names: [
      "Doit contenir",
      "Ne doit pas contenir",
      "Égale à",
      "Ne soit pas égale à",
      "Commence par ",
      "Ne doit pas commencer par",
      "Finit par",
      "Ne doit pas finir par",
      "Nombre de caracteres"
    ]
  }

  const handleTypeChange = (selectedType) => {
    setType(selectedType)
    setIndexDesc(types.findIndex(t => t.type == selectedType))
  }

  const handleSelectedType = () => {
    setUseForm(!useForm)
  }

  const schema = getSchemaMatching(categories, rules)
  
  const onSubmit = ({formData}, e) => {
    console.log(type)
    console.log("Data submitted: ",  formData)
    
    let obj = {}
    obj.code = formData.code
    obj.message = formData.message
    
    if ( formData.number.length == 1 ) {
      obj.number = formData.number[0]
      obj.regex = generator(formData.rule, formData.patterns, formData.isWord)
    } else {
      obj.number = formData.number
      obj.value = applyRule(formData.rule, formData.patterns, formData.isWord)
      obj.match = formData.match
    }
    
    console.log("object :")
    console.log(obj)
  }


  const Footer = () => (
    <Row className="justify-content-end">
      {useForm && <Button className="m-1" variant="primary" type="submit">Valider</Button>}
      <Button className="m-1" variant="secondary" onClick={() => handleSelectedType()}> { useForm ? "Retour" : "Suivant"} </Button>
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
      { !useForm && <Row> Choisissez un type de régle : </Row>}
      <Row>
        { useForm ? <Form/> : <List/> }
      </Row>
    </Container>
  );
}

export default TypeList;


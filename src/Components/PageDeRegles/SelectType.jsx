import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap'

const TypeList = () => {
  
  const [type, setType] = useState("matching")
  const [indexDesc, setIndexDesc] = useState(0)

  const types = [
    { name: "matching", type: "matching", description: "Description de matching" },
    { name: "dependances", type: "dependances", description: "Description de dependances" },
    { name: "Conditionnels", type: "Conditionnels", description: "Description de Conditionnels" },
    { name: "Structurel", type: "Structurel", description: "Description de Structurel" },
    { name: "idRef", type: "idRef", description: "Description de idRef" },
  ]

  const handleSelectedType = (type) => {
    setType(type)
    setIndexDesc(types.findIndex(t => t.type == type))
  }

  return (
    <Container>
      <Row>
        <Col>
          <ListGroup defaultActiveKey="#link1">
            {types.map(type => {
              return(
                <ListGroup.Item key={type.type} action onClick={() => handleSelectedType(type.type)}>
                  {type.name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col>
            <Row className="align-self-start">
              <Card>
                <Card.Body>{types[indexDesc].description}</Card.Body>
              </Card>
            </Row>
            <Row className="align-self-end">
              <Button>
                Suivant
              </Button>
            </Row>
        </Col>
      </Row>
  </Container>
  );
}

export default TypeList;
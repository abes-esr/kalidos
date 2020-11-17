import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import IconButton from '@material-ui/core/IconButton'

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
    setIndexDesc(types.findIndex(type => type.type == type))
  }

  return (
    <Container>
      <Row>
        <Col>
          <ListGroup defaultActiveKey="#link1">
            {types.map(type => {
              return(
                <ListGroup.Item key={type.type} action onClick={handleSelectedType(type.type)}>
                  {type.name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col>
            <Card>
          <Card.Body>{type[indexDesc].description}</Card.Body>
            </Card>
        </Col>
      </Row>
  </Container>
  );
}

export default TypeList;
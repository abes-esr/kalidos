import React from "react"
import { Col, Container, Row } from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import { IconButton } from "@material-ui/core"

export default function ArrayFieldTemplate(props) {
  
  const AddingField = () => (
    <Row className="p-1 align-items-center">
      <Col>
          <p>{props.title}</p>
      </Col>
      <Col>
        <IconButton size="small" color="primary" onClick={props.onAddClick}>
          <AddIcon/>
        </IconButton>
      </Col>
    </Row>
  )

  return (
    <div className={props.className}>
      {props.canAdd && <AddingField/>}

      <Container>
        {props.items && props.items.map(element => (
          <Row key={element.key} className={element.className}>
            <div className="col-10"> {element.children} </div>
            <div className="col-2">
              <IconButton size="small" variant="outlined" onClick={element.onDropIndexClick(element.index)}>
                <CancelIcon/>
              </IconButton>
            </div>
          </Row>
        ))}
      </Container>
    </div>
  );
}

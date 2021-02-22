import React from "react"
import { Col, Container, Row } from 'react-bootstrap'
import AddIcon from '@material-ui/icons/AddCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import { IconButton } from "@material-ui/core"

/**
 * Composant template pour les fields de type array
 * @param {} props 
 */
export default function ArrayFieldTemplate(props) {
  
  const AddingField = () => (
    <Row className="p-1 align-items-center">
      <Col xs={8}>
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
        {props.items && props.items.map(element => {
          return(
          <Row key={element.key} className={element.className}>
            <div className="col-11 shadow p-2 m-0 bg-white rounded"> 
              {element.children}
            </div>
            <div className="col-1">
              <IconButton size="small" variant="outlined" onClick={element.onDropIndexClick(element.index)}>
                <CancelIcon/>
              </IconButton>
            </div>
          </Row>
        )})}
      </Container>
    </div>
  );
}

import React, { useState } from 'react'

import { Button, Form, Modal } from 'react-bootstrap'
import IconButton from '@material-ui/core/IconButton'

function ModalForm({button, title, body, close, accept, accepting}){

  const [showHide, setShowHide] = useState(false);


  const handleModalShowHide = () => {
    setShowHide(!showHide)
  }


  const whenClosing = () => {
    handleModalShowHide()
  }

  const whenAccepting = () => {
    accepting()
    handleModalShowHide()
  }


  return (
    <div>
      <IconButton className="p-0" onClick={() => handleModalShowHide()}>
        {button}
      </IconButton>

      <Modal show={showHide}>

        <Modal.Header closeButton onClick={() => whenClosing()}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>{body}</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => whenClosing()}>
              {close}
            </Button>

            <Button variant="primary" onClick={() => whenAccepting()} type="submit">
              {accept}
            </Button>

          </Modal.Footer>
        </Form>

      </Modal>
    </div>
  )

}


export default ModalForm;
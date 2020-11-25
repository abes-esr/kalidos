import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import IconButton from '@material-ui/core/IconButton'

function BootstrapModal({button, title, body }) {

  const [showHide, setShowHide] = useState(false);

  const handleModalShowHide = () => {
    setShowHide(!showHide)
  }


  const whenClosing = () => {
    handleModalShowHide()
  }

  return (
    <div >
      <IconButton color="primary" onClick={() => handleModalShowHide()}>
        {button}
      </IconButton>

      <Modal show={showHide}>

        <Modal.Header closeButton onClick={() => whenClosing()}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{body}</Modal.Body>

      </Modal>
    </div>
  )
}


export default BootstrapModal;
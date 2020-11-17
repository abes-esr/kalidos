import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'





function BootstrapModal({button, title, body, close, accept, accepting}) {

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
      <Button variant={this.props.buttonColor} size={this.props.buttonSize} onClick={() => this.handleModalShowHide()}>
        {this.props.button}
      </Button>

      <Modal show={this.state.showHide}>

        <Modal.Header closeButton onClick={() => this.whenClosing()}>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{this.props.body}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.whenClosing()}>
            {this.props.close}
          </Button>

          <Button variant="primary" onClick={() => this.whenAccepting()}>
            {this.props.accept}
          </Button>

        </Modal.Footer>

      </Modal>
    </div>
  )
}


export default BootstrapModal;
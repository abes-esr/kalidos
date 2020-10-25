import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

class BootstrapModalForm extends React.Component {

  constructor() {
    super()
    this.state = {
      showHide: false
    }
  }


  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide })
  }


  whenClosing() {
    // this.props.closing()
    this.handleModalShowHide()
  }

  whenAccepting() {
    this.props.accepting()
    this.handleModalShowHide()
  }


  render() {

    return (
      <div>
        <Button variant={this.props.buttonColor} size="sm" onClick={() => this.handleModalShowHide()}>
          {this.props.button}
        </Button>

        <Modal show={this.state.showHide}>

          <Modal.Header closeButton onClick={() => this.whenClosing()}>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>{this.props.body}</Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.whenClosing()}>
                {this.props.close}
              </Button>

              <Button variant="primary" onClick={() => this.whenAccepting()} type="submit">
                {this.props.accept}
              </Button>

            </Modal.Footer>
          </Form>

        </Modal>
      </div>
    )
  }
}


export default BootstrapModalForm;
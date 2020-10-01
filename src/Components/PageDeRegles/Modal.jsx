import React from 'react'
import { Button, Modal } from 'react-bootstrap'

class BootstrapModal extends React.Component {

    constructor() {
        super();
        this.state = {
            showHide: false
        }
    }


    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }


    render() {

        return (
            <div>
                <Button variant="primary" size="sm" onClick={() => this.handleModalShowHide()}>
                    Launch demo modal
                </Button>

                <Modal show={this.state.showHide}>

                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                            Close
                        </Button>

                        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                            Save Changes
                        </Button>

                    </Modal.Footer>

                </Modal>
            </div>
        )
    }
}


export default BootstrapModal;
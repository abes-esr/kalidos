/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Modal, Button } from 'react-bootstrap';
import ButtonText from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';

function FormModal(props) {
  const {
    icon,textButton, overlay, title, body, close, accept, acceptFunc
  } = props
  const [showHide, setShowHide] = useState(false);

  const handleModalShowHide = () => {
    setShowHide(!showHide);
  };

  const whenClosing = () => {
    handleModalShowHide();
  };

  const whenAccepting = () => {
    handleModalShowHide();
    if (acceptFunc) {
      acceptFunc()
    }
  };

  const triggerButton = textButton ? 
  <OverlayTrigger placement="auto" delay={{ show: 250, hide: 400 }} overlay={overlay}>            
    <ButtonText variant="contained" color="primary" startIcon={icon} onClick={() => handleModalShowHide()}> 
      {title}
    </ButtonText>
  </OverlayTrigger> :
  <OverlayTrigger placement="auto" delay={{ show: 250, hide: 400 }} overlay={overlay}>            
    <IconButton color="primary" onClick={() => handleModalShowHide()}>
      {icon}
    </IconButton>
  </OverlayTrigger>

  return (
    <div>
        {triggerButton}
      
      <Modal show={showHide} onHide={whenClosing} scrollable size='xl'>

        <Modal.Header closeButton onClick={() => whenClosing()}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{body}</Modal.Body>

        {(close !== null && accept !== null) && (
          <Modal.Footer>
            <Button variant="secondary" onClick={() => whenClosing()}>
              {close}
            </Button>
            <Button variant="primary" onClick={() => whenAccepting()}>
              {accept}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default FormModal;

FormModal.defaultProps = {
  close: null,
  accept: null,
  textButton: false
};

FormModal.propTypes = {
  icon: PropTypes.any.isRequired,
  textButton: PropTypes.any,
  overlay: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.any.isRequired,
  close: PropTypes.string,
  accept: PropTypes.string,
  // accepting: PropTypes.func,
};

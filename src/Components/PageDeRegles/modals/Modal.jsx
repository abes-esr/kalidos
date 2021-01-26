/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';

function FormModal({
  button, title, body, close, accept,
}) {
  const [showHide, setShowHide] = useState(false);

  const handleModalShowHide = () => {
    setShowHide(!showHide);
  };

  const whenClosing = () => {
    handleModalShowHide();
  };

  const whenAccepting = () => {
    handleModalShowHide();
  };
  return (
    <div>
      <IconButton color="primary" onClick={() => handleModalShowHide()}>
        {button}
      </IconButton>

      <Modal show={showHide}>

        <Modal.Header closeButton onClick={() => whenClosing()}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{body}</Modal.Body>

        { (close !== null && accept !== null) && (
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
  // accepting: null
};

FormModal.propTypes = {
  button: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.any.isRequired,
  close: PropTypes.string,
  accept: PropTypes.string,
  // accepting: PropTypes.func,
};

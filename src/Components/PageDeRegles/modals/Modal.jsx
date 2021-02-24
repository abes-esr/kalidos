/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Modal, Button } from 'react-bootstrap';
import { MDBIcon } from 'mdbreact';
import IconButton from '@material-ui/core/IconButton';

/**
 * Composant de base pour la création des modals ADD EDIT DELETE
 * 
 * @param {
 *    icon: Icone du button déclencheur (texte),
 *    textButton : {
 *        true : le button est un rectangle qui aura le même texte que celui du champ title,
 *        false : (default) le button est un simple icone 
 *    },
 *    overlay : Tooltip à afficher dans le overlay,
 *    title : titre à afficher dans le modal,
 *    body : ce qui sera affiche par le modal (les composants sont possibles),
 *    close : (default -> null) message à afficher pour le button de fermeture,
 *    accept : (default -> null) message à afficher pour le button de "acceptation",
 * } props 
 */
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
    <Button variant="primary" style={{ width: "100%" }} onClick={() => handleModalShowHide()}>
      <i className={icon} ></i> {title}
    </Button >
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
  textButton: PropTypes.bool,
  overlay: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.any.isRequired,
  close: PropTypes.string,
  accept: PropTypes.string,
  // accepting: PropTypes.func,
};

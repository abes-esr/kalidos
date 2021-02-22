/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';


/**
 * Composant de base pour la creation du modal TEST
 * 
 * @param {
    *    icon: Icone du button declencheur,
    *    title : titre a afficher dans le modal,
    *    body : ce qui sera affiche par le modal (les composants sont possibles),
    *    close : (default -> null) message a afficher pour le button de fermeture,
    *    accept : (default -> null) message a afficher pour le button de "acceptation",
    * } props 
    */
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

            <Modal show={showHide} onHide={whenClosing} scrollable size="xl">

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
};

FormModal.propTypes = {
    button: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.any.isRequired,
    close: PropTypes.string,
    accept: PropTypes.string,
};

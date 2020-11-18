import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import IconButton from '@material-ui/core/IconButton'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        backgroundColor: "#6BD6D4"
        
      }
    }
  }
})

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
      <MuiThemeProvider theme={theme} >
        <IconButton color="primary" onClick={() => handleModalShowHide()}>
          {button}
        </IconButton>
      </MuiThemeProvider>

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
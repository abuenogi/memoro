import React, { Fragment, useContext } from "react";
import { withRouter } from 'react-router-dom';
import { Modal , Button} from 'reactstrap';
import { UserContext } from '../context/UserContext';

export const ModalWindow = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.modalWindowTitle}</h4>
          <p>
            {props.modalWindowMessage }
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={props.onHide}> {props.modalWindowButton}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
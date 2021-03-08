import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Jitsi from "react-jitsi";
import "../App.css";

function CallModal(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-customWidth"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.roomTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Jitsi
          roomName={props.roomName}
          displayName={props.userFullName}
          config={{ prejoinPageEnabled: false }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CallModal;

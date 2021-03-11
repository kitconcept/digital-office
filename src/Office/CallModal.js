import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Jitsi from "react-jitsi";
import "../App.css";

const CallModal = (props) => {
  useEffect(() => {});
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
    </Modal>
  );
};

export default CallModal;

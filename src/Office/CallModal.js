import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Jitsi from "react-jitsi";
import "../App.css";

// Modal for Jitsi Call
//Props:
//roomName = Jitsi Call ID
//userFullName : User Name for Jitsi Call
//roomTitle: Title that shows on office floor
const CallModal = (props) => {
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

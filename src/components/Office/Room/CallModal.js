import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Jitsi from "react-jitsi";
import "../../../App.css";

// Modal for Jitsi Call
//Props:
//roomName = Jitsi Call ID
//userFullName : User Name for Jitsi Call
//roomTitle: Title that shows on office floor
const CallModal = (props) => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title"
      dialogClassName="modal-customWidth"
    >
      <Modal.Header className="callModalHeader" closeButton>
        <Modal.Title id="contained-modal-title">{props.roomTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="callModalBody">
        <Jitsi
          containerStyle={{ height: 700, width: 800 }}
          roomName={props.roomName}
          displayName={props.userFullName}
          config={{ prejoinPageEnabled: false }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CallModal;

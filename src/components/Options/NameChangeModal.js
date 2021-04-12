import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Col, Row, Button } from "react-bootstrap";

// Name Change Modal
// Props:
// EnterKey: KeyListener Hook for Enter Key
// show: boolean for showing modal
// handleClose: function to close modal
// nameSubmit: function to save Name Changes

const NameChangeModal = (props) => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const inputEl = useRef(null);

  useEffect(() => {
    if (props.EnterKey) {
      props.nameSubmit(FirstName, LastName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.EnterKey]);

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change User Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Control
                ref={inputEl}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                placeholder="First name"
              />
            </Col>
            <Col>
              <Form.Control
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                placeholder="Last name"
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => props.nameSubmit(FirstName, LastName)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NameChangeModal;

import React from "react";
import { Modal } from "react-bootstrap";
import "../App.css";

// Color Picker
// props:
// colorSubmit: function for saving color changes
const ColorPickerModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Avatar Color</Modal.Title>
      </Modal.Header>
      <Modal.Body className="ColorPicker">
        <div
          className="Color Red"
          onClick={() => props.colorSubmit("Color Red")}
        >
          {props.userFullName.charAt(0)}
        </div>
        <div
          className="Color Orange"
          onClick={() => props.colorSubmit("Color Orange")}
        >
          {props.userFullName.charAt(0)}
        </div>
        <div
          className="Color Yellow"
          onClick={() => props.colorSubmit("Color Yellow")}
        >
          {props.userFullName.charAt(0)}
        </div>
        <div
          className="Color Green"
          onClick={() => props.colorSubmit("Color Green")}
        >
          {props.userFullName.charAt(0)}
        </div>
        <div
          className="Color Teal"
          onClick={() => props.colorSubmit("Color Teal")}
        >
          {props.userFullName.charAt(0)}
        </div>
        <div
          className="Color Blue"
          onClick={() => props.colorSubmit("Color Blue")}
        >
          {props.userFullName.charAt(0)}
        </div>
        <div
          className="Color Black"
          onClick={() => props.colorSubmit("Color Black")}
        >
          {props.userFullName.charAt(0)}
        </div>
        <div
          className="Color White"
          onClick={() => props.colorSubmit("Color White")}
        >
          {props.userFullName.charAt(0)}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ColorPickerModal;

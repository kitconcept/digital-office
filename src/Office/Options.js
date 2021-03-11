import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NameChangeModal from "./NameChangeModal.js";
import ColorPickerModal from "./ColorPickerModal.js";

const Options = (props) => {
  const [showNameChange, setShowNameChange] = useState(false);
  const handleCloseNameChange = () => setShowNameChange(false);
  const handleShowNameChange = () => setShowNameChange(true);
  const nameSubmit = (firstname, lastname) => {
    props.nameSubmit(firstname, lastname);
    handleCloseNameChange();
  };

  const [showColorChange, setShowColorChange] = useState(false);
  const handleCloseColorChange = () => setShowColorChange(false);
  const handleShowColorChange = () => setShowColorChange(true);
  const colorSubmit = (color) => {
    props.colorSubmit(color);
    handleCloseColorChange();
  };

  return (
    <>
      <div className="Options">
        <Button className="Option" onClick={handleShowColorChange}>
          Change Color
        </Button>
        <Button className="Option" onClick={handleShowNameChange}>
          Change Name
        </Button>
        <div className="UserName">User Name: {props.userFullName}</div>
      </div>
      <ColorPickerModal
        show={showColorChange}
        handleClose={handleCloseColorChange}
        colorSubmit={colorSubmit}
        userFullName={props.userFullName}
      />
      <NameChangeModal
        show={showNameChange}
        handleClose={handleCloseNameChange}
        nameSubmit={nameSubmit}
        EnterKey={props.EnterKey}
      />
    </>
  );
};
export default Options;

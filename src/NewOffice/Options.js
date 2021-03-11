import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NameChangeModal from "../Office/NameChangeModal.js";

const Options = (props) => {
  const [showNameChange, setShowNameChange] = useState(false);
  const handleCloseNameChange = () => setShowNameChange(false);
  const handleShowNameChange = () => setShowNameChange(true);
  const nameSubmit = (firstname, lastname) => {
    props.nameSubmit(firstname, lastname);
    handleCloseNameChange();
  };
  return (
    <>
      <div className="Options">
        <Button className="Option">Change Color</Button>
        <Button className="Option" onClick={handleShowNameChange}>
          Change Name
        </Button>
        <div className="UserName">User Name: {props.userFullName}</div>
      </div>
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

import React, { useState, useEffect } from "react";
import Room from "./Room.js";
import Button from "react-bootstrap/Button";
import ColorPickerModal from "./ColorPickerModal.js";
import NameChangeModal from "./NameChangeModal.js";
import RoomList from "./RoomList";
import "../App.css";

const Office = () => {
  //User Name for the jitsi Call
  const [userFullName, setUserFullName] = useState("Thomas Kindermann");
  //state for keeping track of the Avatar Position
  const [AvatarPosition, setAvatarPosition] = useState(5);
  //calling KeyPress Hooks
  const ArrowUp = useKeyPress("ArrowUp");
  const ArrowDown = useKeyPress("ArrowDown");
  const ArrowLeft = useKeyPress("ArrowLeft");
  const ArrowRight = useKeyPress("ArrowRight");
  const EnterKey = useKeyPress("Enter");
  // Modal State for Name Change
  const [showNameChange, setShowNameChange] = useState(false);
  const handleCloseNameChange = () => setShowNameChange(false);
  const handleShowNameChange = () => setShowNameChange(true);
  // Save the changed Name in userFullName
  const nameSubmit = (firstname, lastname) => {
    if (firstname !== "") setUserFullName(firstname + " " + lastname);
    handleCloseNameChange();
  };
  // Modal State for ColorPicker
  const [showColorPicker, setShowColorPicker] = useState(false);
  const handleCloseColorPicker = () => setShowColorPicker(false);
  const handleShowColorPicker = () => setShowColorPicker(true);
  const [AvatarColor, setAvatarColor] = useState("Color White");
  const colorSubmit = (newColor) => {
    setAvatarColor(newColor);
    setShowColorPicker(false);
  };

  //Movement of the Avatar via AvatarPosition in 3x3 grid
  useEffect(() => {
    if (ArrowUp && AvatarPosition > 3) {
      setAvatarPosition(AvatarPosition - 3);
    }
    if (ArrowDown && AvatarPosition < 7) {
      setAvatarPosition(AvatarPosition + 3);
    }
    if (ArrowRight && AvatarPosition % 3 !== 0) {
      setAvatarPosition(AvatarPosition + 1);
    }
    if (ArrowLeft && AvatarPosition % 3 !== 1) {
      setAvatarPosition(AvatarPosition - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ArrowUp, ArrowDown, ArrowRight, ArrowLeft]);

  return (
    <>
      <div className="Container">
        <div className="NavBar">
          <Button onClick={handleShowNameChange} className="NameChange Button">
            Change Name
          </Button>
          <div className="UserName">
            User Name:
            <br /> {userFullName}
          </div>
          <Button
            onClick={handleShowColorPicker}
            className="ColorChange Button"
          >
            Change Color
          </Button>
        </div>
        <div className="Floor">
          {createRooms(RoomList, AvatarPosition, AvatarColor, userFullName)}
        </div>
      </div>
      <NameChangeModal
        show={showNameChange}
        handleClose={handleCloseNameChange}
        nameSubmit={nameSubmit}
        EnterKey={EnterKey}
      />
      <ColorPickerModal
        colorSubmit={colorSubmit}
        userFullName={userFullName}
        show={showColorPicker}
        handleClose={handleCloseColorPicker}
      />
    </>
  );
};

//Create Array Of Rooms for Office Render
function createRooms(roomList, AvatarPosition, AvatarColor, userFullName) {
  let Rooms = [];
  for (let i = 0; i < 9; i++) {
    Rooms.push(
      <Room
        key={i}
        RoomNumber={i + 1}
        roomTitle={roomList[i].title}
        roomName={roomList[i].name}
        userFullName={userFullName}
        AvatarSelector={AvatarPosition}
        AvatarColor={AvatarColor}
      />
    );
  }
  return Rooms;
}

//KeyPress Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // If released key is trget key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return keyPressed;
}

export default Office;

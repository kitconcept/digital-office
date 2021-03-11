import React, { useState, useEffect } from "react";
import Room from "./Room.js";
import ColorPickerModal from "./ColorPickerModal.js";
import RoomList from "./RoomList";
import Options from "./Options.js";
import "../App.css";

const Office = () => {
  const windowDimensions = useWindowResize();
  const [top, setTop] = useState(60);
  const [left, setLeft] = useState(600);
  const ArrowUp = useKeyPress("ArrowUp");
  const ArrowDown = useKeyPress("ArrowDown");
  const ArrowLeft = useKeyPress("ArrowLeft");
  const ArrowRight = useKeyPress("ArrowRight");
  const EnterKey = useKeyPress("Enter");
  const [userFullName, setUserFullName] = useState("Thomas Kindermann");
  const nameSubmit = (firstname, lastname) => {
    if (firstname !== "") setUserFullName(firstname + " " + lastname);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (ArrowUp && top > 20) {
        setTop(top - 1);
      }
      if (ArrowDown && top < windowDimensions[0]) {
        setTop(top + 1);
      }
      if (ArrowRight && left < windowDimensions[1]) {
        setLeft(left + 1);
      }
      if (ArrowLeft && left > 19) {
        setLeft(left - 1);
      }
    }, 2);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ArrowUp, ArrowDown, ArrowRight, ArrowLeft, left, top]);

  return (
    <div className="Container">
      <div className="Office">
        {createRooms(RoomList, [left, top], userFullName)}
      </div>
      <Options
        userFullName={userFullName}
        nameSubmit={nameSubmit}
        EnterKey={EnterKey}
      />
      <div className="Avatar" style={{ top: top, left: left }}>
        {userFullName.charAt(0)}
      </div>
    </div>
  );
};

// //Create Array Of Rooms for Office Render
function createRooms(roomList, avatarPosition, userFullName) {
  let Rooms = [];
  for (let i = 0; i < roomList.length; i++) {
    Rooms.push(
      <Room
        key={i}
        width={roomList[i].width}
        height={roomList[i].height}
        left={roomList[i].left}
        top={roomList[i].top}
        roomTitle={roomList[i].title}
        roomName={roomList[i].name}
        userFullName={userFullName}
        avatarPosition={avatarPosition}
      />
    );
  }
  return Rooms;
}

//Key Press Hook
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

//Window Resize Hook
function useWindowResize() {
  const [maxWindwoWidth, setMaxWindowWidth] = useState(
    window.innerWidth - (window.innerWidth - 818) - 41
  );
  const [maxWindowHeight, setMaxWindowHeight] = useState(
    window.innerHeight - (window.innerHeight - 632) - 40
  );
  function ResizeHandler() {
    setMaxWindowWidth(window.innerWidth - (window.innerWidth - 818) - 41);
    setMaxWindowHeight(window.innerHeight - (window.innerHeight - 632) - 40);
  }
  useEffect(() => {
    window.addEventListener("resize", ResizeHandler);
    return () => {
      window.removeEventListener("resize", ResizeHandler);
    };
  }, []);

  return [maxWindowHeight, maxWindwoWidth];
}

export default Office;

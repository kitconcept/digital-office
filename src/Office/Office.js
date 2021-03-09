import React, { useState, useEffect } from "react";
import Room from "./Room.js";
import "../App.css";

const Office = () => {
  const [AvatarSelector, setAvatarSelector] = useState(5);
  const roomName =
    "kitconcept-digital-office-123e4567-e89b-12d3-a456-426655440000";
  const userFullName = "Thomas Kindermann";
  const ArrowUp = useKeyPress("ArrowUp");
  const ArrowDown = useKeyPress("ArrowDown");
  const ArrowLeft = useKeyPress("ArrowLeft");
  const ArrowRight = useKeyPress("ArrowRight");

  useEffect(() => {
    if (ArrowUp) {
      console.log("ArrowUp");
    }
    if (ArrowDown) {
      console.log("ArrowDown");
    }
    if (ArrowRight) {
      console.log("ArrowRight");
    }
    if (ArrowLeft) {
      console.log("ArrowLeft");
    }
  });

  return (
    <div className="Container">
      <div className="Floor">
        <Room
          RoomNumber={1}
          roomTitle="Bonn"
          roomName={roomName}
          userFullName={userFullName}
          AvatarSelector={AvatarSelector}
        />
        <Room
          RoomNumber={2}
          roomTitle=""
          roomName=""
          userFullName={userFullName}
          AvatarSelector={AvatarSelector}
        />
        <Room
          RoomNumber={3}
          roomTitle="Barcelona"
          roomName={roomName}
          userFullName={userFullName}
          AvatarSelector={AvatarSelector}
        />
        <Room
          RoomNumber={4}
          roomTitle=""
          roomName=""
          userFullName={userFullName}
          AvatarSelector={AvatarSelector}
        />
        <Room
          RoomNumber={5}
          roomTitle=""
          roomName=""
          userFullName={userFullName}
          AvatarSelector={AvatarSelector}
        />
        <Room
          RoomNumber={6}
          roomTitle=""
          roomName=""
          userFullName={userFullName}
          AvatarSelector={AvatarSelector}
        />
        <Room
          RoomNumber={7}
          roomTitle="Berlin"
          roomName={roomName}
          userFullName={userFullName}
          AvatarSelector={AvatarSelector}
        />
        <Room
          RoomNumber={8}
          roomTitle=""
          roomName=""
          userFullName={userFullName}
          AvatarSelector={AvatarSelector}
        />
        <Room
          RoomNumber={9}
          roomTitle="London"
          roomName={roomName}
          userFullName={userFullName}
          AvatarSelector={AvatarSelector}
        />
      </div>
    </div>
  );
};

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keyPressed;
}

export default Office;

import React, { useState, useEffect } from "react";
import CallModal from "../Room/CallModal";
import "../../../App.css";

// Jitsi-Call Room
//Props:
//avatarPosition: x,y coordinates of Avatar
//left: room x position
//top: room y position
//width: room width
//height room height
//roomTitle: Name to show on Office Floor
//roomName: jitsi call ID
//userFullName: user Name for jitsi call

const Room = (props) => {
  //state for showing jitsi Call in a Modal
  const [modalShow, setModalShow] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState(0);
  const handleShow = () => setModalShow(true);
  const handleHide = () => setModalShow(false);

  const handler = ({ roomName, userCount }) => {
    if (roomName === props.roomName) {
      setUsersInRoom(userCount);
    }
  };

  const insideRoomFlag = useAvatarPositionCheck(
    props.avatarPosition,
    props.left,
    props.top,
    props.width,
    props.height
  );

  useEffect(() => {
    props.socket.on("roomData", handler);

    return () => {
      props.socket.off("roomData", handler);
    };
  }, [usersInRoom]);

  useEffect(() => {
    if (insideRoomFlag) {
      props.socket.emit("joinRoom", props.roomName);

      handleShow();
    } else {
      props.socket.emit("leaveRoom", props.roomName);
      handleHide();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insideRoomFlag]);

  return (
    <>
      <div
        className="Room"
        style={{
          width: props.width,
          height: props.height,
          top: props.top + props.windowDimensions[1],
          left: props.left + props.windowDimensions[0],
        }}
      >
        {props.roomTitle}
      </div>
      {
        <CallModal
          show={modalShow}
          onHide={handleHide}
          roomTitle={props.roomTitle}
          roomName={props.roomName}
          userFullName={props.userFullName}
          usersInRoom={usersInRoom}
          socket={props.socket}
        />
      }
    </>
  );
};

// Room Collision Check
function useAvatarPositionCheck(avatarPosition, left, top, width, height) {
  const [positionCheck, setPositionCheck] = useState(false);

  // Returns True if avatar is inside a Call-Room
  useEffect(() => {
    if (
      avatarPosition[0] > left - 1 &&
      avatarPosition[0] < left + width - 38 &&
      avatarPosition[1] > top - 1 &&
      avatarPosition[1] < top + height - 38
    ) {
      setPositionCheck(true);
    } else {
      setPositionCheck(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarPosition]);

  return positionCheck;
}

export default Room;

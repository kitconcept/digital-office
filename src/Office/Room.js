import React, { useState, useEffect } from "react";
import CallModal from "./CallModal.js";
import "../App.css";

const Room = (props) => {
  //state for showing jitsi Call in a Modal
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleHide = () => setModalShow(false);

  const insideRoomFlag = useAvatarPositionCheck(
    props.avatarPosition,
    props.left,
    props.top,
    props.width,
    props.height
  );

  useEffect(() => {
    if (insideRoomFlag) {
      handleShow();
    } else handleHide();
  }, [insideRoomFlag]);

  return (
    <>
      <div
        className="Room"
        style={{
          width: props.width,
          height: props.height,
          top: props.top,
          left: props.left,
        }}
      >
        {props.roomTitle}
      </div>
      {
        //only return jitsi Call-modal if the room has a Call set up
        props.roomName !== "" && (
          <CallModal
            show={modalShow}
            onHide={handleHide}
            roomTitle={props.roomTitle}
            roomName={props.roomName}
            userFullName={props.userFullName}
          />
        )
      }
    </>
  );
};

function useAvatarPositionCheck(avatarPosition, left, top, width, height) {
  const [positionCheck, setPositionCheck] = useState(false);

  useEffect(() => {
    if (
      avatarPosition[0] > left &&
      avatarPosition[0] < left + width - 40 &&
      avatarPosition[1] > top &&
      avatarPosition[1] < top + height - 40
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

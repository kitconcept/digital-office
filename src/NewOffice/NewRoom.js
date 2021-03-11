import React, { useState, useEffect } from "react";
import "./NewOffice.css";
import CallModal from "../Office/CallModal.js";

const NewRoom = (props) => {
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
        className="NewRoom"
        style={{
          width: props.width,
          height: props.height,
          top: props.top,
          left: props.left,
        }}
      ></div>
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

export default NewRoom;

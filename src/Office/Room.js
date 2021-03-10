import React, { useState, useEffect } from "react";
import CallModal from "./CallModal.js";
import "../App.css";

const Room = (props) => {
  //state for showing jitsi Call in a Modal
  const [modalShow, setModalShow] = useState(false);
  //creating className for Room position in CSS
  const RoomNumber = "Room Number" + props.RoomNumber;

  //checking if the Avatar is in the current Room
  useEffect(() => {
    if (props.RoomNumber === props.AvatarSelector) {
      setModalShow(true);
    } else {
      setModalShow(false);
    }
  }, [props.RoomNumber, props.AvatarSelector]);

  // return the Office room
  return (
    <>
      <div className={RoomNumber}>
        <div className="RoomTitle">{props.roomTitle}</div>

        {
          //only returning Avatar if its present in the Room
          props.RoomNumber === props.AvatarSelector && (
            <div className="Avatar">{props.userFullName.charAt(0)}</div>
          )
        }
      </div>

      {
        //only return jitsi Call-modal if the room has a Call set up
        props.roomName !== "" && (
          <CallModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            roomTitle={props.roomTitle}
            roomName={props.roomName}
            userFullName={props.userFullName}
          />
        )
      }
    </>
  );
};

export default Room;

import React, { useState, useEffect } from "react";
import md5 from "md5";
import io from "socket.io-client";
import Options from "../Options/Options";

import Room from "./Room/Room.js";
import roomList from "./Room/RoomList";
import "../../App.css";

// location of server
const ENDPOINT = "https://digitaloffice.kitconcept.io/";
//const ENDPOINT = "localhost:5000";

//empty socket for connection
let socket = io.connect(ENDPOINT, { transports: ["websocket"] });

const Office = () => {
  //Calling Window Resize Hook
  const windowDimensions = useWindowResize();
  // Calling Key Listener Hook
  const ArrowUp = useKeyPress("ArrowUp");
  const ArrowDown = useKeyPress("ArrowDown");
  const ArrowLeft = useKeyPress("ArrowLeft");
  const ArrowRight = useKeyPress("ArrowRight");
  const wKey = useKeyPress("w");
  const aKey = useKeyPress("a");
  const sKey = useKeyPress("s");
  const dKey = useKeyPress("d");
  const enterKey = useKeyPress("Enter");

  // avatar List for render
  const [avatars, setAvatars] = useState([]);

  // Position of user Avatar
  const [x, setX] = useState(500);
  const [y, setY] = useState(500);

  // user name and Gravatar
  const [name, setName] = useState("");
  const [gravatar, setGravatar] = useState("");

  // name Change
  const [showNameChange, setShowNameChange] = useState(false);
  const handleShowNameChange = () => {
    setShowNameChange(true);
  };
  const handleHideNameChange = () => {
    setShowNameChange(false);
  };

  // Gravatar Change
  const [showGravatarChange, setShowGravatarChange] = useState(false);
  const handleShowGravatarChange = () => {
    setShowGravatarChange(true);
  };
  const handleHideGravatarChange = () => {
    setShowGravatarChange(false);
  };

  const submit = () => {
    setGravatar(gravatar.trim().toLowerCase());
    document.cookie = "name=" + name + ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
    document.cookie =
      "gravatar=" + gravatar + ";expires=Fri, 31 Dec 9999 23:59:59 GMT";
    handleHideNameChange();
    handleHideGravatarChange();
    socket.emit("changeName", { name, gravatar });
  };

  useEffect(() => {
    let name = "";
    let gravatar = "";
    if (
      !document.cookie
        .split(";")
        .some((item) => item.trim().startsWith("name="))
    ) {
      handleShowNameChange();
    } else {
      name = document.cookie
        .split("; ")
        .find((row) => row.startsWith("name="))
        .split("=")[1];
      setName(name);
      gravatar = document.cookie
        .split("; ")
        .find((row) => row.startsWith("gravatar="))
        .split("=")[1];
      setGravatar(gravatar.trim().toLowerCase());
    }

    // add Avatar to server list
    socket.emit("join", { name, gravatar, x, y });

    // listen for Avatarlist from server
    socket.on("floorData", ({ avatars }) => {
      setAvatars(avatars);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // user Avatar Movement
  useEffect(() => {
    if (showNameChange || showGravatarChange) {
      if (enterKey) {
        submit();
      }
    } else {
      const interval = setInterval(() => {
        if (ArrowUp | wKey && y > 0) {
          setY(y - 10);
        }
        if (ArrowDown | sKey && y < 660) {
          setY(y + 10);
        }
        if (ArrowRight | dKey && x < 860) {
          setX(x + 10);
        }
        if (ArrowLeft | aKey && x > 0) {
          setX(x - 10);
        }
      }, 20);

      // update position to server
      if (name !== "") {
        socket.emit("update", { x, y });
      }

      return () => clearInterval(interval);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ArrowUp,
    ArrowDown,
    ArrowRight,
    ArrowLeft,
    wKey,
    aKey,
    sKey,
    dKey,
    x,
    y,
    enterKey,
  ]);

  return (
    <div className="outerContainer">
      <Options
        handleShowNameChange={handleShowNameChange}
        handleShowGravatarChange={handleShowGravatarChange}
        avatars={avatars}
        windowDimensions={windowDimensions}
      />
      <div className="officeContainer">
        <div className="Office">
          {roomList.map((room, i) => (
            <Room
              key={i}
              width={room.width}
              height={room.height}
              left={room.left}
              top={room.top}
              windowDimensions={windowDimensions}
              roomTitle={room.title}
              roomName={room.name}
              userFullName={name}
              avatarPosition={[x, y]}
              avatars={avatars}
              socket={socket}
            />
          ))}
        </div>
      </div>

      {avatars.map((avatar) => (
        <div
          key={avatar.id}
          className="Avatar"
          style={{
            left: avatar.x + windowDimensions[0],
            top: avatar.y + windowDimensions[1],
          }}
        >
          <p style={{ background: avatar.color }}>{avatar.name.charAt(0)}</p>
          <div
            style={{
              background:
                "url(https://www.gravatar.com/avatar/" +
                md5(avatar.gravatar) +
                "?s=40&d=blank)",
            }}
          ></div>
        </div>
      ))}
      {showNameChange === true && (
        <div>
          <div onClick={submit} className="NameChangeBackDrop"></div>
          <div className="NameChange">
            <h1 className="heading">Change Name</h1>
            <input
              placeholder="Name"
              className="joinInput"
              type="text"
              onChange={(event) => setName(event.target.value)}
              autoFocus
            />
            <button
              onClick={submit}
              className="button mt-20 submit"
              type="submit"
            >
              submit
            </button>
          </div>
        </div>
      )}
      {showGravatarChange === true && (
        <div>
          <div onClick={submit} className="NameChangeBackDrop"></div>
          <div className="NameChange">
            <h1 className="heading">Change Picture</h1>
            <input
              placeholder="Account Email"
              value={gravatar}
              className="joinInput"
              type="text"
              onChange={(event) => setGravatar(event.target.value)}
              autoFocus
            />
            <p className="text">
              {"change your profile picture with: "}
              <a href="http://en.gravatar.com/">Gravatar</a>
            </p>
            <button
              onClick={submit}
              className="button mt-20 submit"
              type="submit"
            >
              submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

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

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

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
  // MaxWidth equals to the office Width minus Avatar Diameter
  const [maxWindwoWidth, setMaxWindowWidth] = useState(
    (window.innerWidth - 900) / 2
  );

  //MaxHeight equals to the office height minus avatar diameter
  const [maxWindowHeight, setMaxWindowHeight] = useState(
    (window.innerHeight - 700) / 2
  );

  //Changes MaxWidth / MaxHeight on Windowresize
  function ResizeHandler() {
    setMaxWindowWidth((window.innerWidth - 900) / 2);
    setMaxWindowHeight((window.innerHeight - 700) / 2);
  }
  useEffect(() => {
    window.addEventListener("resize", ResizeHandler);
    return () => {
      window.removeEventListener("resize", ResizeHandler);
    };
  }, []);

  return [maxWindwoWidth, maxWindowHeight];
}

export default Office;

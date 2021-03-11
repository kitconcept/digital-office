import React, { useState, useEffect } from "react";
import "./NewOffice.css";
import NewRoom from "./NewRoom.js";

const NewOffice = () => {
  const windowDimensions = useWindowResize();
  const [top, setTop] = useState(60);
  const [left, setLeft] = useState(600);
  const ArrowUp = useKeyPress("ArrowUp");
  const ArrowDown = useKeyPress("ArrowDown");
  const ArrowLeft = useKeyPress("ArrowLeft");
  const ArrowRight = useKeyPress("ArrowRight");

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
    <div className="NewContainer">
      <div className="NewOffice">
        <NewRoom
          width={214}
          height={328}
          left={19}
          top={20}
          avatarPosition={[left, top]}
        />
        <NewRoom
          width={214}
          height={274}
          left={19}
          top={357}
          avatarPosition={[left, top]}
        />

        <NewRoom
          width={103}
          height={108}
          left={372}
          top={275}
          avatarPosition={[left, top]}
        />
      </div>
      <div className="NewAvatar" style={{ top: top, left: left }}>
        {left},{top}
      </div>
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

export default NewOffice;

import React from "react";

const Options = (props) => {
  return (
    <div
      className="optionsOuterContainer"
      style={{
        top: props.windowDimensions[1],
        width: props.windowDimensions[0] - 8,
      }}
    >
      <div className="optionsContainer">
        <button onClick={props.handleShowNameChange} className="change button">
          change name
        </button>

        <button
          onClick={() =>
            window.open("https://meet.google.com/was-czcz-wxc", "_blank")
          }
          className="meet button"
        >
          Google-Meet
        </button>
        <div className="OptionsHading">Users Connected</div>
        {props.avatars.map((avatar) => (
          <div className="UserInRoom">
            <div
              key={avatar.id}
              className="AvatarIcon"
              style={{
                background: avatar.color,
              }}
            >
              {avatar.name.charAt(0).toUpperCase()}
            </div>
            <p>{avatar.name.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;

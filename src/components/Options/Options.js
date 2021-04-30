import React from "react";
import md5 from "md5";

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
          onClick={props.handleShowGravatarChange}
          className="change button"
        >
          change picture
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
            <div key={avatar.id} className="AvatarIcon">
              <p style={{ background: avatar.color }}>
                {avatar.name.charAt(0)}
              </p>
              <div
                style={{
                  background:
                    "url(https://www.gravatar.com/avatar/" +
                    md5(avatar.gravatar) +
                    "?s=20&d=blank)",
                }}
              ></div>
            </div>

            <p>{avatar.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;

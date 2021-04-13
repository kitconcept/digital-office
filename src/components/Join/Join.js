import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "../../App.css";

const Join = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("Aqua");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join Office</h1>
        <div>
          <input
            placeholder="First Name - Last Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
          <Form.Control
            className="joinInput mt-20"
            as="select"
            onChange={(event) => setColor(event.target.value)}
            placeholder="color"
          >
            <option>Aqua</option>
            <option>Black</option>
            <option>Blue</option>
            <option>Crimson</option>
            <option>DeepPink</option>
            <option>GoldenRod</option>
            <option>Green</option>
            <option>Grey</option>
            <option>Indigo</option>
            <option>Lime</option>
            <option>Magenta</option>
            <option>OrangeRed</option>
            <option>Orchid</option>
            <option>Red</option>
            <option>SaddleBrown</option>
            <option>Teal</option>
            <option>White</option>
            <option>Yellow</option>
          </Form.Control>
        </div>
        <Link
          onClick={(event) => (!name || !color ? event.preventDefault() : null)}
          to={"/Office/?name=" + name + "&color=" + color}
        >
          <button
            className="button mt-20 submit"
            style={{ background: color }}
            type="submit"
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;

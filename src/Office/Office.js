import React from "react";
import Room from "./Room.js";

class Office extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      showModal: true,
    };
  }

  handleShow() {
    this.setState({
      showModal: true,
    });
  }

  handleClose() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    return (
      <div className="Container">
        <div className="Floor">
          <Room RoomNumber="One" RoomName="Bonn" onClick={this.handleShow} />
          <div className="Room Two" />
          <Room RoomNumber="Three" RoomName="Barcelona" />
          <div className="Room Four" />
          <div className="Room Five" />
          <div className="Room Six" />
          <Room RoomNumber="Seven" RoomName="Berlin" />
          <div className="Room Eight" />
          <Room RoomNumber="Nine" RoomName="London" />
        </div>
      </div>
    );
  }
}

export default Office;

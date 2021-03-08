import React from "react";
import Room from "./Room.js";

class Office extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName:
        "kitconcept-digital-office-123e4567-e89b-12d3-a456-426655440000",
      userFullName: "Timo Stollenwerk",
    };
  }

  render() {
    return (
      <div className="Container">
        <div className="Floor">
          <Room
            RoomNumber="One"
            roomTitle="Bonn"
            roomName={this.state.roomName}
            userFullName={this.state.userFullName}
          />
          <div className="Room Two" />
          <Room
            RoomNumber="Three"
            roomTitle="Barcelona"
            roomName={this.state.roomName}
            userFullName={this.state.userFullName}
          />
          <div className="Room Four" />
          <div className="Room Five" />
          <div className="Room Six" />
          <Room
            RoomNumber="Seven"
            roomTitle="Berlin"
            roomName={this.state.roomName}
            userFullName={this.state.userFullName}
          />
          <div className="Room Eight" />
          <Room
            RoomNumber="Nine"
            roomTitle="London"
            roomName={this.state.roomName}
            userFullName={this.state.userFullName}
          />
        </div>
      </div>
    );
  }
}

export default Office;

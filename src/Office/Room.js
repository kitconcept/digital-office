import React from "react";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RoomNumber: "Room " + this.props.RoomNumber,
    };
  }

  handleClick() {}

  render() {
    return <div className={this.state.RoomNumber}>{this.props.RoomName}</div>;
  }
}

export default Room;

import React from "react";
import CallModal from "./CallModal.js";
class Room extends React.Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.state = {
      RoomNumber: "Room " + this.props.RoomNumber,
      modalShow: false,
    };
  }
  handleShow() {
    this.setState({
      modalShow: true,
    });
  }
  handleHide() {
    this.setState({
      modalShow: false,
    });
  }

  render() {
    return (
      <>
        <div className={this.state.RoomNumber} onClick={this.handleShow}>
          {this.props.roomTitle}
        </div>
        <CallModal
          show={this.state.modalShow}
          onHide={this.handleHide}
          roomTitle={this.props.roomTitle}
          roomName={this.props.roomName}
          userFullName={this.props.userFullName}
        />
      </>
    );
  }
}

export default Room;

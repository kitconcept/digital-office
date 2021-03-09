import React from "react";
import CallModal from "./CallModal.js";
import "../App.css";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.state = {
      RoomNumber: "Room Number" + this.props.RoomNumber,
      modalShow: false,
    };
  }

  componentDidMount() {
    if (this.props.RoomNumber === this.props.AvatarSelector) {
      this.handleShow();
    }
  }

  handleShow() {
    if (this.props.roomName !== "")
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
          <div className="RoomTitle">{this.props.roomTitle}</div>
          {this.props.RoomNumber === this.props.AvatarSelector && (
            <div className="Avatar">{this.props.userFullName.charAt(0)}</div>
          )}
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

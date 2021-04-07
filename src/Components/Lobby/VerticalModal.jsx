import React, { Component } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactPlayer from "react-player";
import axios from "axios";

const getAccessToken = localStorage.getItem("token");
export default class MyVerticallyCenteredModal extends Component {
  state = {
    videoUrl: "",
  };
  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;

    axios.get("http://140.82.28.121:5500/api/lobby/getvideo").then((res) => {
      this.setState({ videoUrl: res.data });
    });
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body style={{ height: "30rem" }} closebutton="true">
          <Button className="float-right" onClick={this.props.onHide}>
            x
          </Button>
          <ReactPlayer
            url={this.state.videoUrl}
            controls={true}
            width="98.5%"
            height="90%"
          />
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
}

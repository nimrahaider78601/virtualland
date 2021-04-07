import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "./AboutModal.css";

export default class AboutModal extends Component {
  state = {
    boothinfo: [],
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="bg-dark p-3" style={{ borderRadius: "22px" }}>
          <div className="modal-container">
            <span onClick={this.props.onHide} className="float-right cross">
              X
            </span>
            <div className="text-center text-light p-5 about-para">
              <div dangerouslySetInnerHTML={{ __html: this.props.text }} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

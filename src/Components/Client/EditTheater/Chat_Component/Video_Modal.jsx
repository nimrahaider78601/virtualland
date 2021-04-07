import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Video_Modal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <React.Fragment>
      <div className="video_chat" onClick={() => setModalShow(true)}>
        <i class="fa fa-video-camera" aria-hidden="true"></i>
      </div>

      {/* <!-- Modal --> */}
      <Modal
        show={modalShow}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="video_chat_modal_Theater"
      >
        <Modal.Header className="video_chat_header">
          <span
            className="float-right bg-dark"
            onClick={() => setModalShow(false)}
          >
            x
          </span>
        </Modal.Header>
        <Modal.Body
          className="video_chat_body"
          style={{ height: "30rem" }}
          closebutton="true"
        >
          <img
            src="https://www.alwayswanderlust.com/wp-content/uploads/2018/09/2.jpg"
            alt=""
            height="100%"
            width="100%"
          />
          <div className="drop_call_div">
            <i class="drop_call fa fa-phone" aria-hidden="true"></i>
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* ModalEnd */}
    </React.Fragment>
  );
}

import React, { useState } from "react";
import { Modal, Button, Container, Col, Row } from "react-bootstrap";
import "./DemoModal.css";
import Thumbnail from "./Thumbnail";
import Video from "./Video";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";

function DemoModal(props) {
  const [getVideo, setGetVideo] = useState("");
  const [getVideoList, setGetVideoList] = useState("");

  const playVideo = (url) => {
    setGetVideo(url.toString());
  };

  const params = useParams();
  const getAccessToken = localStorage.getItem("token");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;

    let url = "http://140.82.28.121:5500/api/booth/getallvideos";
    let data = {
      boothId: params.id,
    };

    let multiple = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url: url,
    };
    axios(multiple)
      .then((res) => {
        if (res.data.length) {
          setGetVideo(res.data[0][1]);
        }
      })
      .catch((er) => {
        console.log("no data sorry yehh", er);
      });

    let ural = "http://140.82.28.121:5500/api/booth/getallvideos";
    let dataz = {
      boothId: params.id,
    };

    let multiples = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(dataz),
      url: ural,
    };
    axios(multiples)
      .then((res) => {
        if (res.data.length) {
          setGetVideoList(res.data);
        }
      })
      .catch((er) => {
        console.log("no data sorry yehh", er);
      });
  }, []);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ background: "#2BEADE", padding: "5px 15px 5px 15px" }}
      >
        <Modal.Title>Content</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="bg-light p-3"
        style={{ borderRadius: "0 0 10px 10px" }}
      >
        <Container style={{ height: "50vh", overflowY: "auto" }}>
          <Video text={getVideo} currentVideo={getVideoList} />

          <div className="thumbnail" style={{ overflowX: "auto" }}>
            <Thumbnail
              text={getVideoList}
              currentVideo={getVideo}
              playVideo={playVideo}
            />
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default DemoModal;

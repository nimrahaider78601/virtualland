import qs from "qs";
import React, { Component } from "react";
import { Modal, Container, Col, Row } from "react-bootstrap";
import "./ContentModal.css";
import pdfIcon from "../../images/pdf-icon.png";
import axios from "axios";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import Img from "./../../images/image-42.jpg";
import fileDownload from "js-file-download";

const ContentModal = (props) => {
  // var notes =
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
        <Container style={{ height: "60vh", overflowY: "auto" }}>
          {props.text === "Documents are disabled for this booth" ? (
            <h3 className="text-center" style={{ overflowX: "hidden" }}>
              Documents are disabled for this booth
            </h3>
          ) : props.text.length ? (
            props.text.map(function (item, i) {
              return (
                <div key={i}>
                  <Row>
                    <Col lg={2} md={2} sm={2} xs={2}>
                      <img src={pdfIcon} alt="" />
                    </Col>
                    <Col lg={4} md={4} sm={10} xs={10}>
                      {decodeURI(item[1].substring(35, 85))}
                      <p style={{ fontSize: "9px" }}>{item[2]}</p>
                    </Col>

                    <Col lg={2} md={2} sm={2} xs={2}>
                      120kb
                    </Col>
                    <Col lg={2} md={2} sm={2} xs={2}>
                      <a
                        style={{
                          borderRadius: "15px",
                          fontSize: "9px",
                          border: "none",
                          outlineStyle: "none",
                          padding: "3px 6px 3px 6px",
                          background: "#2BEADE",
                          textDecoration: "none",
                        }}
                        href={item[1]}
                        target="_blank"
                      >
                        open
                      </a>
                    </Col>
                    <Col lg={2} md={2} sm={4} xs={2}>
                      <button
                        style={{
                          borderRadius: "15px",
                          fontSize: "9px",
                          border: "none",
                          outlineStyle: "none",
                          padding: "3px 6px 3px 6px",
                          background: "#2BEADE",
                          textDecoration: "none",
                        }}
                        // target="_blank"
                        // href={item[1]}
                        // download
                        onClick={() => {
                          handleDownload(`${item[1]}`, "Video_Conference.pdf");
                        }}
                      >
                        download
                      </button>
                    </Col>
                  </Row>
                  <hr style={{ color: "#2BEADE", background: "#2BEADE" }} />
                </div>
              );
            })
          ) : (
            <h3 class="text-center" style={{ overflowY: "hidden" }}>
              No Content Found
            </h3>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const handleDownload = (url, filename) => {
  console.log("Working");
  axios
    .get(url, {
      responseType: "blob",
    })
    .then((res) => {
      fileDownload(res.data, filename);
    });
};

export default ContentModal;

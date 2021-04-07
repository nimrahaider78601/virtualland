import React, { Component, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./VideoPpt.css";

function PptDisplay(props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  const popover = (
    <Popover>
      <Popover.Content>Enter FullScreen</Popover.Content>
    </Popover>
  );
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <React.Fragment>
      <div
        className="main pt-3"
        style={{
          height: "39vh",
          width: "100% !important",
          overflowX: "hidden",
        }}
      >
        <div
          className={`content_ppt sidebardesign `}
          style={{
            height: "80%",
            overflowY: "hidden",
            width: "100% !important",
            overflowX: "hidden",
          }}
        >
          <Document file={props.text} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              style={{ width: "10rem !important" }}
              pageNumber={pageNumber}
            />
          </Document>
        </div>
        <div className=" main_button d-flex justify-content-around align-items-center">
          <div className="pagec ml-5">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
          <div className="buttonc">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="Pre btn"
            >
              Previous
            </button>
            <button
              type="button"
              className="btn mx-2 mr-5"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </button>
            <OverlayTrigger trigger="hover" placement="top" overlay={popover}>
              <button className="last_btn" onClick={toggle}>
                <a href="#myModal" role="button" data-toggle="modal">
                  <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                </a>
              </button>
            </OverlayTrigger>
          </div>
        </div>
        {/* ModalStart */}
        <div className="Checking">
          <Modal
            size="xl"
            isOpen={modal}
            toggle={toggle}
            className="Modal_main"
          >
            <ModalHeader
              className="header d-flex justify-content-around"
              toggle={toggle}
            >
              <h3 style={{ marginLeft: "13vw" }}>Video Conference Ppt</h3>
            </ModalHeader>
            <ModalBody className="modal_body">
              <div
                style={{
                  height: "100%",
                  overflowY: "hidden",
                  width: "70% !important",
                  overflowX: "hidden",
                }}
                className={`content_ppt sidebardesign `}
              >
                <Document
                  className="mx-auto"
                  file={props.text}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page
                    className="mx-auto"
                    style={{ width: "10rem !important" }}
                    pageNumber={pageNumber}
                  />
                </Document>
              </div>
            </ModalBody>
            <ModalFooter className=" py-2 Modal_button d-flex justify-content-around align-items-center">
              <div className="pagec ml-5">
                Page{" "}
                <span className="font-weight-bold">
                  {pageNumber || (numPages ? 1 : "--")}
                </span>{" "}
                of {numPages || "--"}
              </div>
              <div className="buttonc">
                <button
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                  className="Pre btn"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn mx-2 mr-5"
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}
                >
                  Next
                </button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
        {/* ModalEnd */}
      </div>
    </React.Fragment>
  );
}

export default PptDisplay;

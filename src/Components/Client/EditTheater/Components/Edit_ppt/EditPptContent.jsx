import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios, { post } from "axios";
import qs from "qs";
import Pages from "react-page-loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "./Edit_ppt.css";

function EditPptContent(props) {
  console.log("content", props);
  const [EditPpt, setEditPpt] = useState("");
  const params = useParams();
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

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  useEffect(() => {
    let url = "http://140.82.28.121:5500/api/theater/getppt";
    let data = {
      theaterId: props.text.match.params.id,
    };
    let options = {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDY4OTc4NzgsIm5iZiI6MTYwNjg5Nzg3OCwianRpIjoiZjcwOWY1MTMtNGJkNi00OTZkLTk0OGYtZTEzNTZkZjVkYTBhIiwiaWRlbnRpdHkiOiJyYXNoaWRAZ21haWwuY29tfGNsaWVudCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkZW50aXR5IjoicmFzaGlkQGdtYWlsLmNvbXxjbGllbnQifX0.t_5Xq-caXwqyXhkz5H5CZaLgy67wyWCWjh7hUyObK0M",
        // ...data.getHeaders(),

        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(data),
      url,
    };
    axios(options)
      .then((res) => {
        setEditPpt(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);
  function submitDelete(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>
              You want to delete{" "}
              <span className="font-weight-bold text-warning">Ppt</span>
            </p>
            <button className="btn btn-danger btn-sm mx-3" onClick={onClose}>
              No
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                deletePpt(id);
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  }
  function deletePpt(id) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDY4OTc4NzgsIm5iZiI6MTYwNjg5Nzg3OCwianRpIjoiZjcwOWY1MTMtNGJkNi00OTZkLTk0OGYtZTEzNTZkZjVkYTBhIiwiaWRlbnRpdHkiOiJyYXNoaWRAZ21haWwuY29tfGNsaWVudCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkZW50aXR5IjoicmFzaGlkQGdtYWlsLmNvbXxjbGllbnQifX0.t_5Xq-caXwqyXhkz5H5CZaLgy67wyWCWjh7hUyObK0M`;

    let delPpt = new FormData();
    delPpt.append("theaterId", id);
    console.log("There", id);
    axios
      .post(`http://140.82.28.121:5500/api/client/theater/removeppt`, delPpt)

      .then((res) => {
        console.log("DeleteResData", res.data);
        alert(res.data);

        window.location = `/client/EditTheater/EditPpt/${props.text.match.params.id}`;
      });
  }
  if (!EditPpt) {
    return (
      <div>
        <Pages loader={"bar"} color={"#A9A9A9"} size={4} duration={5}>
          <h1 className="text-center">Loading...</h1>
        </Pages>
      </div>
    );
  }
  return (
    <React.Fragment>
      {EditPpt === "Not Found" ? (
        <div className="w-100" style={{ height: "300px", overflowY: "hidden" }}>
          <h3 className="text-center"> No Content Found</h3>
        </div>
      ) : (
        <div>
          <button
            className="btn btn-md delete_ppt btn-danger rounded"
            onClick={() => {
              submitDelete(props.text.match.params.id);
            }}
          >
            Delete Ppt
          </button>
          <div
            className={`content_ppt sidebardesign `}
            style={{
              height: "20rem",
              overflowY: "hidden",
              width: "100% !important",
              overflowX: "hidden",
            }}
          >
            <Document file={EditPpt} onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                style={{ width: "10rem !important" }}
                pageNumber={pageNumber}
              />
            </Document>
          </div>
          <div className="col-12 main_button d-flex justify-content-around align-items-center">
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
          <div className="bg-success Checking">
            <Modal
              size="xl"
              style={{ marginTop: "7rem" }}
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
                  className={`content_ppt sidebardesign`}
                >
                  <Document
                    className="mx-auto"
                    file={EditPpt}
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
      )}
    </React.Fragment>
  );
}

export default EditPptContent;

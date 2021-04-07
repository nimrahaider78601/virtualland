import qs from "qs";
import React, { Component } from "react";
import { Modal, Container, Col, Row } from "react-bootstrap";
import pdfIcon from "../../../../images/pdf-icon.png";
import axios, { post } from "axios";
import fileDownload from "js-file-download";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Page from "react-page-loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const getAccessToken = localStorage.getItem("token");

export default class EditDocumentContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      alert(response.data);
      window.location = `/admin/EditBooth/EditDocument/${this.props.id}`;
    });
  }
  handleChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  fileUpload(file) {
    this.setState({ isLoading: true });
    const url = "http://140.82.28.121:5500/api/admin/booth/adddocument";
    const formData = new FormData();
    formData.append("boothId", this.props.id);
    formData.append("document", file);
    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }
  submitDelete = (id, name) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>
              You want to delete{" "}
              <span className="font-weight-bold text-warning">{name}</span>
            </p>
            <button className="btn btn-danger btn-sm mx-3" onClick={onClose}>
              No
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                this.deleteDocument(id);
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };
  deleteDocument = (id) => {
    let delBody = new FormData();
    delBody.append("boothId", this.props.id);
    delBody.append("fileId", id);

    const getAccessToken = localStorage.getItem("token");

    axios
      .delete(`http://140.82.28.121:5500/api/admin/booth/removedocument`, {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
          // ...data.getHeaders(),

          "content-type": "application/x-www-form-urlencoded",
        },
        data: delBody,
      })
      .then((res) => {
        alert(res.data);
        window.location = `/admin/EditBooth/EditDocument/${this.props.id}`;
      })
      .catch((er) => {
        console.log("error occurred", er);
      });
  };
  // Enable Documents
  enableDocuments = (id) => {
    let data = new FormData();
    data.append("boothId", id);

    const getAccessToken = localStorage.getItem("token");

    let config = {
      method: "post",
      url: "http://140.82.28.121:5500/api/admin/booth/activatedocuments",
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.location = `/admin/EditBooth/EditDocument/${this.props.id}`;
      })

      .catch(function (error) {
        console.log(error);
      });
  };
  // Disable Documents
  disableDocuments = (id) => {
    let data = new FormData();
    data.append("boothId", id);

    const getAccessToken = localStorage.getItem("token");

    let config = {
      method: "post",
      url: "http://140.82.28.121:5500/api/admin/booth/disabledocuments",
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.location = `/admin/EditBooth/EditDocument/${this.props.id}`;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    if (!this.props.text) {
      return (
        <div>
          <Page loader={"bar"} color={"#A9A9A9"} size={4} duration={5}>
            <h1 className="text-center">Loading...</h1>
          </Page>
        </div>
      );
    }

    var contents = (this.props.text || []).map((item, i) => {
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
                className="btn btn-sm rounded p-2"
                style={{
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
                className="btn btn-sm rounded btn-danger p-2"
                style={{
                  fontSize: "9px",
                  border: "none",
                  outlineStyle: "none",
                  padding: "3px 6px 3px 6px",
                  textDecoration: "none",
                }}
                target="_blank"
                href={item[1]}
                onClick={(e) => {
                  this.submitDelete(
                    item[0],
                    decodeURI(item[1].substring(35, 85))
                  );
                }}
              >
                delete
              </button>
            </Col>
          </Row>
          <hr style={{ color: "#2BEADE", background: "#2BEADE" }} />
        </div>
      );
    });
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Page
            loader={"bubble-spin"}
            color={"#A9A9A9"}
            size={4}
            duration={5}
          ></Page>
        ) : (
          <div>
            <div className="row pb-2">
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <h1 style={{ color: "#3f51b5" }}>Edit Document Content</h1>
              </div>
              <div className="col-12  col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div onClick={this.sayHello} className="float-right">
                  <BootstrapSwitchButton
                    checked={
                      this.props.status.Documents_Status === 1 ? true : false
                    }
                    size="sm"
                    onstyle="outline-danger"
                    offstyle="outline-info"
                    style="border"
                    width={200}
                    height={40}
                    onlabel="Disable Documents"
                    offlabel="Enable Documents"
                    onChange={(checked: boolean) => {
                      checked
                        ? this.enableDocuments(this.props.id)
                        : this.disableDocuments(this.props.id);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              {this.props.status.Documents_Status === 0 ? (
                <h3
                  className="text-center"
                  style={{ height: "300px", overflowY: "hidden" }}
                >
                  Documents are Disabled
                </h3>
              ) : contents.length ? (
                contents
              ) : (
                <h3
                  className="text-center"
                  style={{ height: "300px", overflowY: "hidden" }}
                >
                  No Content Found
                </h3>
              )}
            </div>
            <div className="col-12" style={{ marginBottom: "100px" }}>
              <form
                onSubmit={this.handleSubmit}
                className="form-inline float-right"
              >
                <input
                  onChange={this.handleChange}
                  type="file"
                  name="file"
                  className="form-control mr-1"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                />
              </form>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

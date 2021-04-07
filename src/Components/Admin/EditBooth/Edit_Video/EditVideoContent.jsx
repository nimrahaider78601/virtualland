import qs from "qs";
import React, { Component } from "react";
import { Modal, Container, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import axios, { post } from "axios";
import Switch from "react-switch";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Page from "react-page-loading";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const getAccessToken = localStorage.getItem("token");
export default class EditVideoContent extends Component {
  constructor(props) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;

    super(props);
    this.state = {
      file: null,
      VideoStatus: "",
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.enableVideos = this.enableVideos.bind(this);
    this.disableVideos = this.disableVideos.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
      alert(response.data);
      window.location = `/client/EditBooth/EditVideo/${this.props.id}`;
    });
  }

  handleChange(e) {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files[0]);
  }
  fileUpload(file) {
    this.setState({ isLoading: true });
    const url = "http://140.82.28.121:5500/api/admin/booth/addvideo";
    const formData = new FormData();
    formData.append("boothId", this.props.id);
    formData.append("video", file);

    return post(url, formData);
  }
  submitDelete = (id, name) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>
              You want to delete
              <span className="font-weight-bold text-warning"> {name}</span>
            </p>
            <button className="btn btn-danger btn-sm mx-3" onClick={onClose}>
              No
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                this.deleteVideo(id);
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
  deleteVideo = (id) => {
    console.log("FormId", id, "BoothId", this.props.id);
    let delBody = new FormData();
    delBody.append("boothId", this.props.id);
    delBody.append("fileId", id);
    console.log("DelBody", delBody);
    axios
      .delete(`http://140.82.28.121:5500/api/admin/booth/removevideo`, {
        data: delBody,
      })
      .then((res) => {
        console.log("DeleteResData", res.data);
        alert(res.data);
        window.location = `/client/EditBooth/EditVideo/${this.props.id}`;
      })
      .catch((er) => {
        console.log("error occurred", er);
      });
  };
  // Enable Videos
  enableVideos = (id) => {
    let data = new FormData();
    data.append("boothId", id);

    const getAccessToken = localStorage.getItem("token");

    let config = {
      method: "post",
      url: "http://140.82.28.121:5500/api/admin/booth/activatevideos",
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.location = `/client/EditBooth/EditVideo/${this.props.id}`;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // Disable Videos
  disableVideos = (id) => {
    let data = new FormData();
    data.append("boothId", id);

    const getAccessToken = localStorage.getItem("token");

    let config = {
      method: "post",
      url: "http://140.82.28.121:5500/api/admin/booth/disablevideos",
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.location = `/client/EditBooth/EditVideo/${this.props.id}`;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    console.log(this.props.status);
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
            <Col lg={2} md={4} sm={4} xs={4}>
              <ReactPlayer
                className="videos"
                url={item[2]}
                width="100%"
                height="12vh"
              />
            </Col>
            <Col lg={7} md={6} sm={6} xs={6}>
              {decodeURI(item[1])}
            </Col>

            <Col lg={2} md={2} sm={2} xs={2}>
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
                  this.submitDelete(item[0], decodeURI(item[1]));
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
          <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4} duration={5}>
            <h1 className="text-center">Uploading...</h1>
          </Page>
        ) : (
          <div>
            <div className="row pb-2">
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                <h1 style={{ color: "#3f51b5" }}>Edit Video Content</h1>
              </div>
              <div className="col-12  col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div className="float-right">
                  <BootstrapSwitchButton
                    checked={
                      this.props.status.Videos_Status === 1 ? true : false
                    }
                    size="sm"
                    onstyle="outline-danger"
                    offstyle="outline-info"
                    style="border"
                    width={200}
                    height={40}
                    onlabel="Disable Videos"
                    offlabel="Enable Videos"
                    onChange={(checked: boolean) => {
                      checked
                        ? this.enableVideos(this.props.id)
                        : this.disableVideos(this.props.id);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              {this.props.status.Videos_Status === 0 ? (
                <h3
                  className="text-center"
                  style={{ height: "300px", overflowY: "hidden" }}
                >
                  Videos are Disabled
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

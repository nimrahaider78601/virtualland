import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios, { post } from "axios";
import Page from "react-page-loading";
import ReactPlayer from "react-player";

export default class EditVideoContent extends Component {
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
      window.location = `/admin/EditLobby/EditVideo`;
    });
  }
  handleChange(e) {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files[0]);
  }
  fileUpload(file) {
    this.setState({ isLoading: true });
    const url = "http://140.82.28.121:5500/api/admin/lobby/updatevideo";
    const formData = new FormData();
    const getAccessToken = localStorage.getItem("token");
    formData.append("video", file);
    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        "content-type": "multipart/form-data",
      },
    };

    return post(url, formData, config);
  }

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
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4} duration={5}>
            <h1 className="text-center">Uploading...</h1>
          </Page>
        ) : (
          <div className="row">
            <div className="col-12 pb-4">
              <h1 style={{ color: "#3f51b5" }}>Edit Lobby Video</h1>
            </div>
            {this.props.text === "Not Found" ? (
              <div
                style={{ height: "50vh" }}
                className="w-100 d-flex justify-content-center align-items-center"
              >
                <h3 className="text-center">NO content Found</h3>
              </div>
            ) : (
              <div>
                <div className="col-12">
                  <ReactPlayer
                    url={this.props.text}
                    style={{ backgroundColor: "black" }}
                    controls={true}
                    width="100%"
                  />
                </div>
              </div>
            )}
            <div className="col-12 py-2">
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
                  value="Update"
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

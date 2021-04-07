import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios, { post } from "axios";

import Page from "react-page-loading";
const getAccessToken = localStorage.getItem("token");
export default class EditBgContent extends Component {
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
      window.location = `/admin/EditLobby/EditBg`;
    });
  }
  handleChange(e) {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files[0]);
  }
  fileUpload(file) {
    this.setState({ isLoading: true });
    const url = "http://140.82.28.121:5500/api/admin/lobby/updatebackground";
    const formData = new FormData();
    formData.append("background", file);
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
          <Page
            loader={"bubble-spin"}
            color={"#A9A9A9"}
            size={4}
            duration={5}
          ></Page>
        ) : (
          <div className="row">
            <div className="col-12 pb-2">
              <h1 style={{ color: "#3f51b5" }}>Edit Lobby Background</h1>
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
                <div className="col-md-12 d-flex justify-content-center">
                  <img
                    src={this.props.text}
                    height="300px"
                    width="75%"
                    alt=""
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

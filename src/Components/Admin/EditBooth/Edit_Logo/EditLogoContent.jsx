import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios, { post } from "axios";
import Page from "react-page-loading";
export default class AboutUsContent extends Component {
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
      console.log(response.data);
      alert(response.data);
      window.location = `/admin/EditBooth/EditLogo/${this.props.id}`;
    });
  }
  handleChange(e) {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files[0]);
  }
  fileUpload(file) {
    this.setState({ isLoading: true });
    const url = "http://140.82.28.121:5500/api/admin/booth/updatelogo";
    const formData = new FormData();
    formData.append("boothId", this.props.id);
    formData.append("logo", file);

    const getAccessToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
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
            <div className="col-12 pb-4">
              <h1 style={{ color: "#3f51b5" }}>Edit Logo</h1>
            </div>
            <div className="col-md-5 col-lg-4 col-sm-4 col-6">
              <img src={this.props.text} width="100%" alt="" />
            </div>
            <div className="col-12">
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

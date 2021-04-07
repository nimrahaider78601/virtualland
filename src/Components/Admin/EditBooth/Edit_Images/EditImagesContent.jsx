import { dirname } from "path";
import React, { Component } from "react";
import axios, { post } from "axios";
import Page from "react-page-loading";

class EditImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isLoading: false,
    };
    // background
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    // Right
    this.handleRightSubmit = this.handleRightSubmit.bind(this);
    this.handleRightChange = this.handleRightChange.bind(this);
    this.rightFileUpload = this.rightFileUpload.bind(this);
    // Left
    this.handleLeftSubmit = this.handleLeftSubmit.bind(this);
    this.handleLeftChange = this.handleLeftChange.bind(this);
    this.leftFileUpload = this.leftFileUpload.bind(this);
  }
  //   Background Start
  handleSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
      alert(response.data);
      window.location = `/admin/EditBooth/EditImage/${this.props.id}`;
    });
  }
  handleChange(e) {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files[0]);
  }
  fileUpload(file) {
    this.setState({ isLoading: true });
    const url = "http://140.82.28.121:5500/api/admin/booth/updatebg";
    const formData = new FormData();
    formData.append("boothId", this.props.id);
    formData.append("bg", file);

    const getAccessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }

  //   Background End

  // Right Start
  handleRightSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.rightFileUpload(this.state.file).then((response) => {
      console.log(response.data);
      alert(response.data);
      window.location = `/admin/EditBooth/EditImage/${this.props.id}`;
    });
  }
  handleRightChange(e) {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files[0]);
  }
  rightFileUpload(file) {
    this.setState({ isLoading: true });
    const url = "http://140.82.28.121:5500/api/admin/booth/updaterightimage";
    const formData = new FormData();
    formData.append("boothId", this.props.id);
    formData.append("rightImage", file);

    const getAccessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }
  //   Right End

  //   Left Start
  handleLeftSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.leftFileUpload(this.state.file).then((response) => {
      console.log(response.data);
      alert(response.data);
      window.location = `/admin/EditBooth/EditImage/${this.props.id}`;
    });
  }
  handleLeftChange(e) {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files[0]);
  }
  leftFileUpload(file) {
    this.setState({ isLoading: true });
    const url = "http://140.82.28.121:5500/api/admin/booth/updateleftimage";
    const formData = new FormData();
    formData.append("boothId", this.props.id);
    formData.append("leftImage", file);

    const getAccessToken = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }
  //   Left End
  render() {
    if (!this.props.background) {
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
          <div className="container">
            <div className="row">
              <div className="col-12 py-3">
                <h5 style={{ color: "#3f51b5" }}>Edit Background Image</h5>
              </div>
              <div className="col-12 float-center">
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-xl-6 col-12">
                    <img
                      src={this.props.background}
                      width="350px"
                      height="250px"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6 col-12 d-flex align-content-end">
                    <form
                      onSubmit={this.handleSubmit}
                      className="form-inline float-right"
                    >
                      <input
                        onChange={this.handleChange}
                        type="file"
                        className="form-control p-1"
                      />
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="row">
              <div className="col-12 float-center">
                <div className="col-12 py-3">
                  <h5 style={{ color: "#3f51b5" }}>Edit Right Image</h5>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src={this.props.rightImg}
                      width="250px"
                      height="400px"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6 d-flex align-content-end">
                    <form
                      onSubmit={this.handleRightSubmit}
                      className="form-inline float-right"
                    >
                      <input
                        onChange={this.handleRightChange}
                        type="file"
                        className="form-control p-1"
                      />
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Left */}
            <div className="row">
              <div className="col-12 float-center">
                <div className="col-12 py-3">
                  <h5 style={{ color: "#3f51b5" }}>Edit Left Image</h5>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src={this.props.leftImg}
                      width="250px"
                      height="400px"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6 d-flex align-content-end">
                    <form
                      onSubmit={this.handleLeftSubmit}
                      className="form-inline float-right"
                    >
                      <input
                        onChange={this.handleLeftChange}
                        type="file"
                        className="form-control p-1"
                      />
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default EditImage;

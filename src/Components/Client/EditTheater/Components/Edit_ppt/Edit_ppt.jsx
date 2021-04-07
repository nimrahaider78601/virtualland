import React, { Component } from "react";
import axios, { post } from "axios";
import Page from "react-page-loading";
import EditPptContent from "./EditPptContent";
export default class EditPpt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ppt: null,
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.ppt).then((response) => {
      console.log(response.data);
      window.location = `/client/EditTheater/EditPpt/${this.props.text.match.params.id}`;
      alert(response.data);
    });
  }
  handleChange(e) {
    this.setState({ ppt: e.target.files[0] });
    console.log(e.target.files[0]);
  }
  fileUpload(file) {
    this.setState({ isLoading: true });
    const url = "http://140.82.28.121:5500/api/client/theater/updateppt";
    const formData = new FormData();
    formData.append("theaterId", this.props.text.match.params.id);
    formData.append("ppt", file);
    const config = {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDY4OTc4NzgsIm5iZiI6MTYwNjg5Nzg3OCwianRpIjoiZjcwOWY1MTMtNGJkNi00OTZkLTk0OGYtZTEzNTZkZjVkYTBhIiwiaWRlbnRpdHkiOiJyYXNoaWRAZ21haWwuY29tfGNsaWVudCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkZW50aXR5IjoicmFzaGlkQGdtYWlsLmNvbXxjbGllbnQifX0.t_5Xq-caXwqyXhkz5H5CZaLgy67wyWCWjh7hUyObK0M",
        "content-type": "multipart/form-data",
      },
    };

    return post(url, formData, config);
  }
  render() {
    console.log("thos", this.props);
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
          <div className="Edit_ppt row">
            <div className="col-12">
              <h1 style={{ color: "#3f51b5" }}>Edit PPT</h1>
            </div>
            <EditPptContent className="main" {...this.props} />
            <div className="col-12">
              <form
                onSubmit={this.handleSubmit}
                className="form-inline py-2 float-right"
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

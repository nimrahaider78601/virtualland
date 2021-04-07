import React, { Component } from "react";
import axios, { post } from "axios";
import Page from "react-page-loading";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
export default class EditNameContent extends Component {
  state = {
    boothName: "",
    isLoading: false,
  };
  handleSubmit = (event) => {
    this.setState({ isLoading: true });
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDg3MTg0ODIsIm5iZiI6MTYwODcxODQ4MiwianRpIjoiMjg3OWY0MWYtNzFlYS00Zjc5LWJiNWUtZGU0NWZiZGRkYzMzIiwiaWRlbnRpdHkiOiJuaW1yYWhhaWRlcjc4NjBAZ21haWwuY29tfGFkbWluIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnsiaWRlbnRpdHkiOiJuaW1yYWhhaWRlcjc4NjBAZ21haWwuY29tfGFkbWluIn19.nvjqrbmGa80OF7bIfJsLmhxZoNo23ZiE2o201VPTYg0`;
    event.preventDefault();
    let reqBody = new FormData();
    reqBody.append("boothId", this.props.id);
    reqBody.append("boothName", this.state.boothName);
    axios
      .post("http://140.82.28.121:5500/api/admin/booth/updatename", reqBody)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        window.location = `/client/EditBooth/EditName/${this.props.id}`;
      });
  };
  handleChange = (event) => {
    this.setState({ boothName: event.target.value });
    console.log(event.target.value);
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
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4} duration={5}>
            <h1 className="text-center">Uploading...</h1>
          </Page>
        ) : (
          <div>
            <form
              onSubmit={this.handleSubmit}
              style={{
                // height: "80vh",
                width: "100%",
                padding: "10px",
              }}
            >
              <div className="col-12 pb-4">
                <h1 style={{ color: "#3f51b5" }}>Edit Booth Name</h1>
              </div>
              <TextField
                id="standard-basic"
                variant="outlined"
                label="Booth Name"
                name="name"
                defaultValue={this.props.text}
                fullWidth
                autoFocus
                style={{ marginBottom: "15px" }}
                onChange={this.handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth={true}
                color="primary"
                style={{ margin: "10px 0 5px 0" }}
              >
                Update Name
              </Button>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

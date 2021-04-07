import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import AppBar from "./AppBar";
import NotFound from "./../NotFound/NotFound";
const getAccessToken = localStorage.getItem("token");
class CreateBooth extends Component {
  state = {
    boothName: "",
    aboutUs: "",
  };
  handleSubmit = (event) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;
    event.preventDefault();
    let reqBody = new FormData();
    reqBody.append("boothName", this.state.boothName);
    reqBody.append("aboutUs", this.state.aboutUs);
    axios
      .post(
        "http://140.82.28.121:5500/api/admin/mainbooth/createbooth",
        reqBody
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        window.location = "/admin"; //This line of code will redirect you once the submission is succeed
      });
  };
  handleChange = (event) => {
    this.setState({ boothName: event.target.value });
    console.log(event.target.value);
  };
  handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    this.setState({ aboutUs: content });
  };
  render() {
    const getUserType = localStorage.getItem("user_type");

    return (
      <React.Fragment>
        {getUserType === "admin" ? (
          <>
            <AppBar />
            <form
              onSubmit={this.handleSubmit}
              style={{
                // height: "80vh",
                width: "50%",
                margin: "auto",
                border: "1px solid rgba(0,0,0,0.3)",
                padding: "10px",
              }}
            >
              <h1>Create Booth</h1>
              <TextField
                id="standard-basic"
                variant="outlined"
                label="Booth Name"
                name="name"
                fullWidth
                autoFocus
                style={{ marginBottom: "15px" }}
                onChange={this.handleChange}
              />
              <Editor
                apiKey="v0o1w9m2jdi5xspgz324f2orhd22s2muridojynrclh538e3"
                name="name"
                init={{
                  height: 350,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "insertdatetime media table paste wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
                }}
                onEditorChange={this.handleEditorChange}
              />{" "}
              <Button
                type="submit"
                variant="contained"
                fullWidth={true}
                color="primary"
                style={{ margin: "10px 0 5px 0" }}
              >
                Create Booth
              </Button>
            </form>
          </>
        ) : (
          <NotFound />
        )}
      </React.Fragment>
    );
  }
}
export default CreateBooth;

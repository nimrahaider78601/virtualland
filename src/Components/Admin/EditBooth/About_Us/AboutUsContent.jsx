import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "./AboutUs.css";
import Page from "react-page-loading";

const getAccessToken = localStorage.getItem("token");
export default class AboutUsContent extends Component {
  state = {
    aboutUs: "",
    isLoading: false,
  };
  handleSubmit = (event) => {
    this.setState({ isLoading: true });
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;
    event.preventDefault();
    let reqBody = new FormData();
    reqBody.append("boothId", this.props.id);
    reqBody.append("aboutUs", this.state.aboutUs);
    axios
      .post("http://140.82.28.121:5500/api/admin/booth/updateinfo", reqBody)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        window.location = `/admin/EditBooth/AboutUs/${this.props.id}`;
      });
  };
  handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    this.setState({ aboutUs: content });
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
          <Page
            loader={"bubble-spin"}
            color={"#A9A9A9"}
            size={4}
            duration={5}
          ></Page>
        ) : (
          <div className="row">
            <form onSubmit={this.handleSubmit}>
              <div className="Edit_width">
                <Editor
                  className="TextEditor"
                  initialValue={this.props.text}
                  name="aboutUs"
                  init={{
                    height: 300,
                    width: "100%",
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={this.handleEditorChange}
                />
              </div>
              <div className="editor_btn">
                <button className="mt-2 btn btn-primary float-right">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </React.Fragment>
    );
  }
}

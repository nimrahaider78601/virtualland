import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import Page from "react-page-loading";

export default class EditTheater extends Component {
  state = {
    info: "",
    isLoading: false,
  };
  componentDidMount() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDg3MTg0ODIsIm5iZiI6MTYwODcxODQ4MiwianRpIjoiMjg3OWY0MWYtNzFlYS00Zjc5LWJiNWUtZGU0NWZiZGRkYzMzIiwiaWRlbnRpdHkiOiJuaW1yYWhhaWRlcjc4NjBAZ21haWwuY29tfGFkbWluIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnsiaWRlbnRpdHkiOiJuaW1yYWhhaWRlcjc4NjBAZ21haWwuY29tfGFkbWluIn19.nvjqrbmGa80OF7bIfJsLmhxZoNo23ZiE2o201VPTYg0`;

    let reqBody = new FormData();
    reqBody.append("theaterId", this.props.text.match.params.id);
    axios
      .post("http://140.82.28.121:5500/api/theater/getinfo", reqBody)
      .then((res) => {
        this.setState({ info: res.data });
      });
  }

  handleSubmit = (event) => {
    this.setState({ isLoading: true });
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDY4OTc4NzgsIm5iZiI6MTYwNjg5Nzg3OCwianRpIjoiZjcwOWY1MTMtNGJkNi00OTZkLTk0OGYtZTEzNTZkZjVkYTBhIiwiaWRlbnRpdHkiOiJyYXNoaWRAZ21haWwuY29tfGNsaWVudCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkZW50aXR5IjoicmFzaGlkQGdtYWlsLmNvbXxjbGllbnQifX0.t_5Xq-caXwqyXhkz5H5CZaLgy67wyWCWjh7hUyObK0M`;
    event.preventDefault();
    let reqBody = new FormData();
    reqBody.append("theaterId", this.props.text.match.params.id);
    reqBody.append("info", this.state.info);
    axios
      .post("http://140.82.28.121:5500/api/client/theater/updateinfo", reqBody)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        window.location = `/client/TheaterList`;
      });
  };
  handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
    this.setState({ info: content });
  };
  render() {
    console.log(this.props);
    if (!this.state.info) {
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
          <div>
            <div>
              <h1>Update Theater Info</h1>
            </div>

            <form
              className="row d-flex justify-content-center"
              onSubmit={this.handleSubmit}
            >
              <div className="col-12">
                <Editor
                  className="TextEditor"
                  initialValue={this.state.info}
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

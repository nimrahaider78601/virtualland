import React, { Component } from "react";
import Page from "react-page-loading";

export default class RegisterHandler extends Component {
  componentDidMount() {
    window.location.href = "/login";
  }
  render() {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4} duration={5}>
          <h1 className="text-center">Loading...</h1>
        </Page>
      </div>
    );
  }
}

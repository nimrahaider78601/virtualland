import React, { Component } from "react";
import Img1 from "../../images/image-asset.jpeg";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div
        className="d-flex flex-column justify-content-center"
        style={{ height: "100vh", overflowX: "hidden" }}
      >
        <div className="w-100 d-flex justify-content-center align-items-center flex-column">
          <h2 className="text-dark py-3"> Umer Abid Rajpoot</h2>
          <p>Calling...</p>
          <div className="action_call d-flex flex-row">
            <div className="drop_call_div">
              <i class="fa fa-times" aria-hidden="true"></i>
            </div>
            <div className="drop_call_div">
              <i class="fa fa-check" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

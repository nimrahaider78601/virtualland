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
        <div className="row">
          <div className="col-md-5 d-flex justify-content-end">
            <img src={Img1} height="410px" width="300px" alt="NotFound" />
          </div>
          <div className="col-md-7 d-flex flex-column justify-content-center align-items-center">
            <h1
              style={{
                fontSize: "60px",
                letterSpacing: "10px",
                fontFamily: "Showcard Gothic",
              }}
              className="font-weight-bold text-center"
            >
              Awww...Don’t Cry.
            </h1>
            <p
              className="font-weight-bold"
              style={{
                fontSize: "18px",
                fontSmoothing: "subpixel-antialiased",
                fontFamily: "Candara",
              }}
            >
              It's just a 404 Error!
            </p>
            <Link to="/">
              <button className="btn btn-md btn-primary">Go Back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

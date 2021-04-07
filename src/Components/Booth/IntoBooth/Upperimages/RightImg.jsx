import qs from "qs";
import React, { Component } from "react";
import "./RightImg.css";
import axios from "axios";
export default class RightImg extends Component {
  state = {
    boothgetrightimg: [],
  };
  render() {
    return (
      <div className="leftimage">
        {this.props.text === "Not Found" ? (
          <img src={this.props.text} style={{ display: "none" }} />
        ) : (
          <img className="responsive" src={this.props.text} />
        )}
      </div>
    );
  }
}

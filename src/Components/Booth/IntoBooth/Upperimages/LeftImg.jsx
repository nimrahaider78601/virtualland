import qs from "qs";
import React, { Component } from "react";
import "./LeftImg.css";
import axios from "axios";
export default class LeftImg extends Component {
  render() {
    return (
      <div className="rightimage">
        {this.props.text === "Not Found" ? (
          <img src={this.props.text} style={{ display: "none" }} />
        ) : (
          <img className="responsive" src={this.props.text} />
        )}
      </div>
    );
  }
}

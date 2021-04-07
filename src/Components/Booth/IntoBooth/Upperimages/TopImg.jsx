import qs from "qs";
import React, { Component } from "react";
import "./TopImg.css";
import axios from "axios";
export default class TopImg extends Component {
  render() {
    return (
      <div className="topimage">
        {this.props.text === "Not Found" ? (
          <img src={this.props.text} style={{ display: "none" }} />
        ) : (
          <img
            className="responsive mx-auto d-block"
            src={this.props.text}
            alt=""
            srcSet=""
          />
        )}
      </div>
    );
  }
}

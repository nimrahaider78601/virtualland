import React, { Component } from "react";
import "./TopImg.css";

export default class topImgSibling extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="topImgSibling">
          {this.props.text === "Not Found" ? (
            <img src={this.props.text} style={{ display: "none" }} />
          ) : (
            <img className="responsive" src={this.props.text} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

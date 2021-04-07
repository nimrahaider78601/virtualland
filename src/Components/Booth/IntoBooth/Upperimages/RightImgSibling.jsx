import React, { Component } from "react";
import "./LeftImg.css";

export default class RightImgSibling extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="rightImgSibling">
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

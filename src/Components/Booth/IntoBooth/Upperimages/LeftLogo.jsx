import React, { Component } from "react";
import "./LeftImg.css";
export default class LeftLogo extends Component {
  render() {
    return (
      <div className="leftLogo">
        {this.props.text === "Not Found" ? (
          <img src={this.props.text} style={{ display: "none" }} />
        ) : (
          <img
            className="responsive"
            src={
              "https://www.iconbolt.com/iconsets/font-awesome-solid/arrow-alt-circle-right.svg"
            }
          />
        )}
      </div>
    );
  }
}

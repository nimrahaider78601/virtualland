import React, { Component } from "react";
import "./RightImg.css";
export default class RightLogo extends Component {
  render() {
    return (
      <div className="rightLogo">
        {this.props.text === "Not Found" ? (
          <img src={this.props.text} style={{ display: "none" }} />
        ) : (
          <img
            className="responsive"
            src={
              "https://www.iconbolt.com/iconsets/font-awesome-solid/arrow-alt-circle-left.svg"
            }
          />
        )}
      </div>
    );
  }
}

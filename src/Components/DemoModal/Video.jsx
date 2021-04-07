import React, { Component } from "react";
import ReactPlayer from "react-player";

export default class Video extends Component {
  render() {
    // console.log("CurrentVideo", this.props.currentVideo[0][2]);
    // console.log("text", this.props.text);
    return (
      <div className="row justify-content-center">
        {this.props.currentVideo === "Videos are disabled for this booth" ? (
          <h3 style={{ overflowX: "auto" }}>
            Videos are disabled for this booth
          </h3>
        ) : this.props.text.length ? (
          <ReactPlayer
            url={
              this.props.text.startsWith("http://")
                ? this.props.text
                : this.props.currentVideo[0][2]
            }
            style={{ backgroundColor: "black" }}
            controls={true}
            width="98.5%"
            playing={true}
          />
        ) : (
          <h3 style={{ overflowX: "auto" }}>No Content Found</h3>
        )}
      </div>
    );
  }
}

import React, { Component, useState } from "react";
import VideoThumbnail from "react-video-thumbnail";
import "./DemoModal.css";
import ReactPlayer from "react-player";
import { Player, PosterImage } from "video-react";

// const note = , this);
export default class Thumbnail extends Component {
  render() {
    const { currentVideo } = this.props;
    return (
      <React.Fragment>
        <div className="horizontal-scrolling-wrapper flex-nowrap row mt-4 pb-5">
          {this.props.text === "Videos are disabled for this booth" ? (
            <span style={{ display: "none" }}></span>
          ) : this.props.text.length ? (
            this.props.text.map(function (item, i) {
              // console.log(this.props.text, "Testing");
              return (
                <div
                  key={i}
                  className="thumbs col-lg-2 col-md-4 col-sm-4 col-4"
                >
                  <div
                    onClick={
                      (this.toggleClass, () => this.props.playVideo([item[2]]))
                    }
                    className={item[2] == currentVideo ? "activeclass" : ""}
                  >
                    <div
                      className="videos"
                      style={{
                        height: "60px !important",
                        width: "100%",
                        background: `url(${item[3]}) center center/cover no-repeat`,
                      }}
                    ></div>
                    <p>{item[0]}</p>
                  </div>
                </div>
              );
            }, this)
          ) : (
            <p className="hidden" style={{ display: "none" }}>
              None
            </p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

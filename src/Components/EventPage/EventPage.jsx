import React, { Component, useState, useEffect } from "react";
import "./events.css";
import MenuBar from "../MenuBar/MenuBar";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const getAccessToken = localStorage.getItem("token");
class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addClass: "",
      allEvents: [],
      Main: "",
      MainId: "",
      mainName: "",
      MainTheaterBg: "",
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;
    axios.get("http://140.82.28.121:5500/usermanager/userinfo").then((res) => {
      console.log(res.data);
      localStorage.setItem("networking_email", res.data[0][3]);
    });
    const email = localStorage.getItem("networking_email");
    axios
      .get(`http://140.82.28.121:5500/twilio/token/${email}`)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("twilio_events_token", res.data.token);
      })
      .catch((er) => {
        console.log("Unable to get Token", er);
      });
    axios
      .get("http://140.82.28.121:5500/api/getalltheaters", {})
      .then((res) => {
        this.setState({ allEvents: res.data });
      });
    axios.get("http://140.82.28.121:5500/api/maintheater/getbg").then((res) => {
      this.setState({ MainTheaterBg: res.data });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            background: `url(${
              this.state.MainTheaterBg === "Not Found"
                ? "https://images.unsplash.com/photo-1548013758-2472668151e4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
                : this.state.MainTheaterBg
            })`,
          }}
          className="eventsbg"
        >
          <MenuBar />

          <div className="parent mt-3 events rounded container">
            <div className="row flexible">
              <div className="right_div col-12 col-md-6 col-lg-6 col-xl-6">
                <h3 className="right_div_Heading text-center py-2">Events</h3>
                <div
                  className="row right_div_content px-4 py-2 d-flex justify-content-center sidebaar border-right justify-content-center"
                  style={{ overflowX: "hidden" }}
                >
                  {(this.state.allEvents || []).map((item, i) => {
                    return (
                      <div
                        className={`${
                          i == this.state.addClass
                            ? "active_bg col-md-12 pl-4 my-2 py-2"
                            : "col-md-12 pl-4 my-2 bg py-2"
                        }`}
                        key={i}
                      >
                        <div
                          onClick={() =>
                            this.setState({
                              mainId: item[0],
                              mainName: item[1],
                              Main: item[2],
                              addClass: i,
                            })
                          }
                          className="text-dark paras"
                        >
                          <p className="font-weight-bold">{item[1]}</p>
                          <p>jueves 5 de diciembre</p>
                        </div>

                        <div className="paras_span">
                          <span className="time float-left">
                            7:00 pm - 7:00 pm
                          </span>
                          <span className="bg_color_parent float-left pt-1">
                            <Link
                              className="text-decoration-none"
                              to={`/events/videoPpt/${item[0]}`}
                            >
                              <button className="btn btn-sm bgColor_sm px-3 p-1">
                                ver ahora &nbsp;&nbsp;{">"}{" "}
                              </button>
                            </Link>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="left_div_start pr-0 col-12 col-md-6 col-lg-6 col-xl-6 px-2">
                <div className="left_div">
                  <div className="content">
                    <div className="pt-4">
                      <h5
                        className="text-center rounded text-capitalize"
                        style={{ backgroundColor: " #2beade" }}
                      >
                        {this.state.allEvents.length === 0 ? (
                          <p>Loading...</p>
                        ) : this.state.allEvents.length &&
                          this.state.mainName === "" ? (
                          this.state.allEvents[0][1]
                        ) : (
                          this.state.mainName
                        )}
                      </h5>
                      <div className="content_p">
                        {this.state.allEvents.length === 0 ? (
                          <p>Loading...</p>
                        ) : this.state.allEvents.length &&
                          this.state.Main === "" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: this.state.allEvents[0][2],
                            }}
                          />
                        ) : (
                          <>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: this.state.Main,
                              }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="">
                      <span className="first_para"></span>
                      <span className="">
                        <Link
                          className="text-decoration-none"
                          to={`/events/videoPpt/${
                            this.state.allEvents.length === 0 ? (
                              <p>Loading...</p>
                            ) : this.state.allEvents.length &&
                              this.state.MainId === "" ? (
                              this.state.allEvents[0][0]
                            ) : (
                              this.state.MainId
                            )
                          }
                          `}
                        >
                          <button className="btn btn-sm bgColor px-3 p-1">
                            ver ahora &nbsp;&nbsp;{">"}{" "}
                          </button>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(EventPage);

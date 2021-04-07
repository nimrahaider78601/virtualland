import React from "react";
import MenuBar from "../MenuBar/MenuBar";
import "./Networking.css";
import axios from "axios";
const getAccessToken = localStorage.getItem("token");
const Chat = require("twilio-chat");
export default class Networking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myDetails: "",
      value: "",
      text: "",
      messages: [],
      loading: false,
      channel: null,
      user_Details: "",
    };

    this.scrollDiv = React.createRef();
  }
  componentDidMount = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;
    axios.get("http://140.82.28.121:5500/usermanager/userinfo").then((res) => {
      this.setState({ myDetails: res.data });
    });
    axios.get("http://140.82.28.121:5500/usermanager/getusers").then((res) => {
      this.setState({ user_Details: res.data });
      console.log(res.data);
    });

    const { location } = this.props;
    const { state } = location || {};
    const { email, room } = state || {};
    let token = localStorage.getItem("twilio_networking_token");

    const client = await Chat.Client.create(token);

    const room_Name = `networking`;
    client.on("tokenAboutToExpire", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });

    client.on("tokenExpired", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });

    client.on("channelJoined", async (channels) => {
      // getting list of all messages since this is an existing channel

      if (channels.uniqueName == room_Name) {
        const current_messages = await channels.getMessages();
        console.log("Client ", channels);
        this.setState({ messages: current_messages.items || [] });
        this.scrollToBottom();
      }
    });

    try {
      console.log("GoingToJoin", room_Name);
      const channel = await client.getChannelByUniqueName(room_Name);
      console.log("Channel JOined");
      if (channel.uniqueName == room_Name) {
        await this.joinChannel(channel);
        console.log(channel);
        this.setState({ channel, loading: false });
        console.log("Joined channel " + channel.friendlyName);
      }
    } catch {
      try {
        const channel = await client.createChannel({
          uniqueName: room_Name,
          friendlyName: room_Name,
        });
        await this.joinChannel(channel);
        this.setState({ channel, loading: false });
        console.log("SetJoinChannel");
      } catch {
        throw new Error("unable to create channel, please reload this page");
      }
    }
    // console.log(this.state.myDetails[0][0]);
  };
  joinChannel = async (channel) => {
    if (channel.channelState.status !== "joined") {
      await channel.join();
    }
    channel.on("messageAdded", this.handleMessageAdded);
  };

  handleMessageAdded = (message) => {
    const { messages } = this.state;
    this.setState(
      {
        messages: !!messages ? [...messages, message] : [message],
      },
      this.scrollToBottom
    );
  };

  scrollToBottom = () => {
    const scrollHeight = this.scrollDiv.current.scrollHeight;
    const height = this.scrollDiv.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };
  sendMessage = (e) => {
    console.log("Working");
    document.getElementById("create-course-form").reset();
    e.preventDefault();
    const myID = this.state.myDetails[0][0];
    const { text, channel } = this.state;
    if (text && String(text).trim()) {
      this.setState({ loading: true });
      channel && channel.sendMessage(`${myID}~|${text}`);
      this.setState({ text: "", loading: false });
    }
  };
  render() {
    const messages = this.state.messages;
    const { location } = this.props;
    const { state } = location || {};
    const { email, room } = state || {};

    const userDetails = this.state.myDetails[0];

    return (
      <React.Fragment>
        <div
          className="Networking"
          style={{
            background: `url("https://images.unsplash.com/photo-1565598469107-2bd14ae7e7e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1592&q=80")`,
          }}
        >
          <MenuBar />

          <div className="row pt-4">
            <div className="col-md-3  px-5">
              <div
                style={{
                  background: `url("https://images.unsplash.com/photo-1611702700098-dec597b27d9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80")`,
                }}
                className="quote_div text-light px-3 d-flex align-content-around flex-wrap"
              >
                <h3 className="text-light">
                  <i className="fa fa-qq text-info" aria-hidden="true"></i>
                  Video
                </h3>

                <blockquote className="blockquote">
                  <p className="mb-0">
                    <i className="fa fa-quote-left" aria-hidden="true"></i>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                    <i className="fa fa-quote-right" aria-hidden="true"></i>
                  </p>
                  <footer className="blockquote-footer text-light py-2">
                    Shoptra private limited{" "}
                    <cite title="Source Title">Sharjeel Mansha</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className="col-md-6 rounded bg-light">
              <div className="row">
                <div className="col-md-8 m-0 p-0 border-right">
                  <div className="ml-4 py-2 d-flex flex-row align-items-center">
                    <p className="mr-3 m-0 d-flex align-items-center justify-content-center">
                      <span className="first_para px-3 py-1 text-center">
                        chat
                      </span>
                    </p>{" "}
                    <p className="m-0 d-flex align-items-center justify-content-center">
                      <span className="second_para px-3 py-1 text-center">
                        events
                      </span>
                    </p>
                  </div>
                  {userDetails == undefined ? (
                    ""
                  ) : (
                    <>
                      <div
                        style={{
                          height: "65vh",
                          overflowY: "auto",
                          overflowX: "hidden",
                        }}
                        className="networking_sidebar px-1"
                        ref={this.scrollDiv}
                      >
                        <div className="pt-3">
                          {/* User chat */}
                          <div className="text_div py-2 pl-1">
                            {/* Your Chat */}

                            {messages &&
                              messages.map((message) => (
                                <div key={message.index}>
                                  {message.body.split("~|")[0] ==
                                  userDetails[0] ? (
                                    <div
                                      key={message.index}
                                      className="row px-3 d-flex justify-content-end align-items-end pb-3"
                                    >
                                      <div className="mr-3 d-flex justify-content-left  font-weight-boldalign-self-left">
                                        <div className="text-right">
                                          <div className="py-2 px-2 yourchat">
                                            <p
                                              className=" ml-3 pb-1 font-weight-bold"
                                              style={{ color: "#2beade" }}
                                            >
                                              {userDetails[1] +
                                                " " +
                                                userDetails[2]}
                                            </p>
                                            <p className="chat_para mb-0">
                                              {/* {message.body.split("_")[1]} */}
                                              {message.body.split("~|")[1]}
                                            </p>
                                          </div>
                                          <span
                                            className="ml-5 px-2"
                                            style={{ fontSize: "11px" }}
                                          >
                                            {new Date(
                                              message.dateCreated.toISOString()
                                            ).toLocaleString()}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="text-center mr-2 mb-3 d-block">
                                        <img
                                          className="rounded-circle"
                                          style={{
                                            height: "30px",
                                            width: "30px",
                                          }}
                                          src="https://images.unsplash.com/photo-1609349239791-53cf7964978f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="row px-3 d-flex align-items-end pb-3">
                                      <div className="text-center ml-2 d-block">
                                        <img
                                          className="rounded-circle"
                                          style={{
                                            height: "30px",
                                            width: "30px",
                                          }}
                                          src="https://images.unsplash.com/photo-1609349239791-53cf7964978f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                          alt=""
                                        />
                                      </div>
                                      <div className="col-10">
                                        <div className="userChat text-left py-1 px-2">
                                          <p
                                            className="font-weight-bold mb-0"
                                            style={{ color: "#2beade" }}
                                          >
                                            {this.state.user_Details.map(
                                              (value, index) => {
                                                return (
                                                  <span key={index}>
                                                    {message.body.split(
                                                      "~|"
                                                    )[0] == value[0]
                                                      ? value[1] +
                                                        " " +
                                                        value[2]
                                                      : null}
                                                  </span>
                                                );
                                              }
                                            )}
                                          </p>
                                          <p className="chat_para">
                                            {/* {message.body.split("_")[1]} */}
                                            {message.body.split("~|")[1]}
                                          </p>
                                        </div>
                                      </div>
                                      <span
                                        className="ml-5 px-2"
                                        style={{ fontSize: "11px" }}
                                      >
                                        {new Date(
                                          message.dateCreated.toISOString()
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            {/* End */}
                          </div>
                          {/* End */}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="row py-2 form">
                    <div className="col-md-12">
                      <form id="create-course-form">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control rounded"
                            onChange={(event) => {
                              this.setState({ text: event.target.value });
                            }}
                          />
                          <input
                            onClick={this.sendMessage}
                            type="button"
                            value="Enviar"
                            className="px-4 btn input-group-btn rounded text-lowercase"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                  <div>
                    <img
                      height="150px"
                      width="150px"
                      src="https://images.unsplash.com/photo-1611702700098-dec597b27d9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                      className="rounded-circle"
                      alt=""
                    />
                  </div>
                  {userDetails == undefined ? (
                    ""
                  ) : (
                    <div className="text-dark text-center">
                      <p className="name font-weight-bold">
                        {userDetails[1] + " " + userDetails[2]}
                      </p>
                      <p className="info">{userDetails[3]}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-3  px-5">
              <div
                style={{
                  background: `url("https://images.unsplash.com/photo-1611702700098-dec597b27d9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80")`,
                }}
                className="quote_div text-light px-3 d-flex align-content-around flex-wrap"
              >
                <h3 className="text-light">
                  <i className="fa fa-qq text-info" aria-hidden="true"></i>
                  Video
                </h3>

                <blockquote className="blockquote">
                  <p className="mb-0">
                    <i className="fa fa-quote-left" aria-hidden="true"></i>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                    <i className="fa fa-quote-right" aria-hidden="true"></i>
                  </p>
                  <footer className="blockquote-footer text-light py-2">
                    Shoptra private limited{" "}
                    <cite title="Source Title">Sharjeel Mansha</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

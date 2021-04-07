import React, { Component } from "react";
import Video_Modal from "./Video_Modal";
import axios from "axios";
const getAccessToken = localStorage.getItem("token");
const Chat = require("twilio-chat");

export default class Chat_Form extends Component {
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
      this.setState({ myDetails: res.data[0] });
      console.log(res.data);
    });
    axios.get("http://140.82.28.121:5500/usermanager/getusers").then((res) => {
      this.setState({ user_Details: res.data });
      console.log(res.data);
    });
    const { location } = this.props;
    const { state } = location || {};
    const { email, room } = state || {};
    let token = localStorage.getItem("twilio_Net_token");

    const client = await Chat.Client.create(token);

    const room_Names = `events/${this.props.theaterId}`;

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

      if (channels.uniqueName == room_Names) {
        const current_messages = await channels.getMessages();
        console.log("Client ", channels);
        this.setState({ messages: current_messages.items || [] });
        this.scrollToBottom();
      }
    });

    try {
      console.log("GoingToJoin", room_Names);
      const channel = await client.getChannelByUniqueName(room_Names);
      console.log("Channel JOined");
      if (channel.uniqueName == room_Names) {
        await this.joinChannel(channel);
        console.log(channel);
        this.setState({ channel, loading: false });
        console.log("Joined channel " + channel.friendlyName);
      }
    } catch {
      try {
        const channel = await client.createChannel({
          uniqueName: room_Names,
          friendlyName: room_Names,
        });
        await this.joinChannel(channel);
        this.setState({ channel, loading: false });
        console.log("SetJoinChannel");
      } catch {
        throw new Error("unable to create channel, please reload this page");
      }
    }
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
    const myID = this.state.myDetails[0];
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

    const User = this.props.user;
    return (
      <React.Fragment>
        <div className="float-right rounded next_opened" id="pageContent">
          <div class="card" style={{ cursor: "default", width: "30rem" }}>
            <div class="card-header border-0 py-2">
              <div className="row d-flex align-items-end">
                <div className="col-2">
                  <img
                    src="https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"
                    alt=""
                    className="rounded-circle"
                    height="30px"
                    width="30px"
                  />
                  <span class="logged-in text-danger">●</span>
                </div>
                <div
                  className="text-capitalize text-left font-weight-bold col-6 user_name"
                  style={{ cursor: "pointer" }}
                >
                  {this.state.myDetails[1] + " " + this.state.myDetails[2]}
                </div>
                <Video_Modal />
                <div className="close_chat">
                  <i class="fa fa-close" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            {/*Header End*/}
            {/* Body Start */}
            <div
              style={{ overflowY: "auto", overflowX: "hidden" }}
              class="card-body border-0 bg-light mb-4 pb-5"
              ref={this.scrollDiv}
            >
              {this.state.myDetails == undefined ? (
                <div className="pt-3 d-flex justify-content-center align-items-center">
                  <h5>Loading...</h5>
                </div>
              ) : (
                <div className="pt-3">
                  {/* User chat */}
                  {messages &&
                    messages.map((message) => (
                      <div key={message.index}>
                        {message.body.split("~|")[0] ==
                        this.state.myDetails[0] ? (
                          <div
                            key={message.index}
                            className="row px-3 d-flex justify-content-end align-items-end pb-3"
                          >
                            <div className="mr-3 d-flex justify-content-left  font-weight-boldalign-self-left">
                              <div className="text-right">
                                <div className="py-2 px-2 yourchat">
                                  <p
                                    className=" m-0 pb-1 font-weight-bold"
                                    style={{ color: "#2beade" }}
                                  >
                                    {this.state.myDetails[1] +
                                      " " +
                                      this.state.myDetails[2]}
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
                          <>
                            <div className="row px-3 d-flex align-items-end pb-3">
                              <div className="text-center ml-2 d-block">
                                <img
                                  className="rounded-circle"
                                  style={{ height: "30px", width: "30px" }}
                                  src="https://images.unsplash.com/photo-1609349239791-53cf7964978f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                  alt=""
                                />
                              </div>
                              <div className="col-10">
                                <div className="userchat py-2 px-2">
                                  <p
                                    className="font-weight-bold pb-1 m-0"
                                    style={{ color: "#2beade" }}
                                  >
                                    {this.state.user_Details == ""
                                      ? ""
                                      : this.state.user_Details.map(
                                          (value, index) => {
                                            return (
                                              <span key={index}>
                                                {message.body.split("~|")[0] ==
                                                value[0]
                                                  ? value[1] + "  " + value[2]
                                                  : null}
                                              </span>
                                            );
                                          }
                                        )}
                                  </p>
                                  <p className="pb-0 mb-0">
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
                          </>
                        )}
                      </div>
                    ))}
                  {/* End */}
                </div>
              )}
              <div className="bg-light border-0 chat_form py-2">
                <form id="create-course-form">
                  <input
                    type="text"
                    className="px-2 mr-2 ml-3"
                    onChange={(event) => {
                      this.setState({ text: event.target.value });
                    }}
                  />
                  <input
                    onClick={this.sendMessage}
                    type="button"
                    value="Enviar"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

import { FormatAlignCenter } from "@material-ui/icons";
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Video_Modal from "./Video_Modal";
import InComingClientCall from "./InComingClientCall";
const Chat = require("twilio-chat");
export default class Chat_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      text: "",
      messages: [],
      loading: false,
      channel: null,
      lastMsg: "",
      show: false,
      isCalled: false,
      InComingShow: false,
      close: false,
    };

    this.scrollDiv = React.createRef();
  }
  componentDidMount = async () => {
    const { location } = this.props;
    const { state } = location || {};
    const { email, room } = state || {};
    let token = localStorage.getItem("twilio_token");

    const client = await Chat.Client.create(token);
    const boothID = this.props.boothId;
    const room_Names = `booth/${boothID}`;

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
    this.showModal();
  };
  componentDidUpdate() {
    console.log("DidddddUpdate", this.state.lastMsg);
    if (
      this.state.lastMsg.split("~|")[2] === "djhvfwehjfvkerhg" &&
      !this.state.isCalled
    ) {
      this.setState({ InComingShow: true });
      this.setState({ isCalled: true });
      console.log("DidUpdateWorkkkk", this.state.lastMsg);
    }
  }
  showModal = () => {
    console.log("FunctionWork");
    this.setState({ InComingShow: true });
  };

  joinChannel = async (channel) => {
    if (channel.channelState.status !== "joined") {
      await channel.join();
    }
    channel.on("messageAdded", this.handleMessageAdded);
  };

  handleMessageAdded = (message) => {
    const { messages } = this.state;
    console.log(message);
    const lastMessage = message.state.body;
    this.setState({
      lastMsg: lastMessage,
    });

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
    document.getElementById("create-course-form").reset();
    e.preventDefault();

    const my_id = localStorage.getItem("my_id");
    const { text, channel } = this.state;
    if (text && String(text).trim()) {
      this.setState({ loading: true });
      channel && channel.sendMessage(`user~|${my_id}~|${text}`);
      this.setState({ text: "", loading: false });
    }
  };
  sendStopMessage = (e) => {
    const { channel } = this.state;
    const my_id = localStorage.getItem("my_id");
    this.setState({ loading: true });
    this.setState({ isCalled: false });
    this.setState({ InComingShow: false });
    channel && channel.sendMessage(`user~|${my_id}~|hdfweijfiwejfnweons`);
  };
  sendVideoMessage = (e) => {
    this.setState({ show: true });
    const my_id = localStorage.getItem("my_id");
    const { text, channel } = this.state;
    this.setState({ loading: true });
    channel && channel.sendMessage(`user~|${my_id}~|djhvfwehjfvkerhg`);
    this.setState({ text: "", loading: false });
  };
  render() {
    const messages = this.state.messages;
    const { location } = this.props;
    const { state } = location || {};
    const { email, room } = state || {};
    const my_id = localStorage.getItem("my_id");
    const User = this.props.user;
    return (
      <React.Fragment>
        <div className="float-right rounded next_opened">
          <div className="card" style={{ cursor: "default", width: "30rem" }}>
            <div className="card-header border-0 py-2">
              <div className="row d-flex align-items-end">
                <div className="col-2">
                  <img
                    src="https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"
                    alt=""
                    className="rounded-circle"
                    height="30px"
                    width="30px"
                  />
                  <span className="logged-in text-danger">●</span>
                </div>
                <div
                  className="text-capitalize text-left font-weight-bold col-6 user_name"
                  style={{ cursor: "pointer" }}
                >
                  {User[1] + " " + User[2]}
                </div>
                <div className="video_chat" onClick={this.sendVideoMessage}>
                  <i className="fa fa-video-camera" aria-hidden="true"></i>
                </div>
                <Modal
                  show={this.state.show}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  className="video_chat_modal_user"
                >
                  <Modal.Header className="video_chat_header">
                    <h2>RoomOnGoing:</h2>
                    <span
                      className="float-right bg-dark"
                      onClick={() => this.setState({ show: false })}
                    >
                      x
                    </span>
                  </Modal.Header>
                  <Video_Modal fName={User[1]} lName={User[2]} />
                </Modal>
                {/* ModalEnd */}
                <div className="close_chat">
                  <i className="fa fa-close" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            {/*Header End*/}
            {/* Body Start */}
            <div
              style={{ overflowY: "auto", overflowX: "hidden" }}
              className="card-body border-0 bg-light m-0 p-0"
              ref={this.scrollDiv}
            >
              <div className="text_div py-2 pl-1">
                <div className="py-3">
                  {/* Your Chat */}
                  {messages.length === 0 ? (
                    <div className="text-center">Loading....</div>
                  ) : (
                    messages &&
                    messages.map((message) => (
                      <div key={message.index}>
                        {/* User chat */}
                        {this.state.lastMsg.split("~|")[0] === "client" &&
                        message.body.split("~|")[1] == my_id &&
                        this.state.lastMsg.split("~|")[2] ===
                          "djhvfwehjfvkerhg" ? (
                          <>
                            <div
                              onClick={(event) => {
                                this.showModal();
                              }}
                            ></div>
                            <Modal
                              show={this.state.InComingShow}
                              size="lg"
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                              className="video_chat_modal"
                            >
                              <Modal.Header className="video_chat_header">
                                <h2>RoomInComing:</h2>
                                <span
                                  className="float-right bg-dark"
                                  onClick={(event) => {
                                    this.sendStopMessage();
                                    this.setState({ InComingShow: false });
                                  }}
                                >
                                  x
                                </span>
                              </Modal.Header>
                              <InComingClientCall User={User} />
                            </Modal>
                            {/* ModalEnd */}
                          </>
                        ) : message.body.split("~|")[0] === "client" &&
                          message.body.split("~|")[1] === my_id ? (
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
                              <div className="userChat text-left py-1 px-2">
                                <p
                                  className="font-weight-bold mb-0"
                                  style={{ color: "#2beade" }}
                                ></p>
                                <p className="chat_para">
                                  {message.body.split("~|")[2] ==
                                  "hdfweijfiwejfnweons" ? (
                                    <span className="text-danger font-weight-bold">
                                      Call ended
                                    </span>
                                  ) : message.body.split("~|")[2] ==
                                    "djhvfwehjfvkerhg" ? (
                                    <span className="text-success font-weight-bold">
                                      Call Started
                                    </span>
                                  ) : (
                                    message.body.split("~|")[2]
                                  )}
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
                        ) : message.body.split("~|")[0] === "user" &&
                          message.body.split("~|")[1] === my_id ? (
                          <div
                            key={message.index}
                            className="row px-3 d-flex justify-content-end align-items-end pb-3"
                          >
                            <div className="mr-3 d-flex justify-content-left  font-weight-boldalign-self-left">
                              <div className="text-right">
                                <div className="py-1 px-2 yourChats">
                                  <p
                                    className=" ml-3 mb-0 font-weight-bold"
                                    style={{ color: "#2beade" }}
                                  ></p>
                                  <p className="chat_para">
                                    {message.body.split("~|")[2] ==
                                    "hdfweijfiwejfnweons" ? (
                                      <span className="text-danger font-weight-bold">
                                        Call ended
                                      </span>
                                    ) : message.body.split("~|")[2] ==
                                      "djhvfwehjfvkerhg" ? (
                                      <span className="text-success font-weight-bold">
                                        Call Started
                                      </span>
                                    ) : (
                                      message.body.split("~|")[2]
                                    )}
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
                                style={{ height: "30px", width: "30px" }}
                                src="https://images.unsplash.com/photo-1609349239791-53cf7964978f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt=""
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))
                  )}
                  {/* End */}
                </div>
              </div>
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
                    type="submit"
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

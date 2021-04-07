import React, { Component } from "react";
import axios from "axios";
import { ContactsOutlined } from "@material-ui/icons";
const getAccessToken = localStorage.getItem("token");
const Chat = require("twilio-chat");
const getUserType = localStorage.getItem("user_type");
export default class Chat_Icon extends Component {
  state = {
    myDetails: [],
  };
  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;
    axios.get("http://140.82.28.121:5500/usermanager/userinfo").then((res) => {
      this.setState({ myDetails: res.data });
      localStorage.setItem("email", res.data[0][3]);
      localStorage.setItem("my_id", res.data[0][0]);
    });
  }
  getToken = async (email) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;
    const response = await axios
      .get(`http://140.82.28.121:5500/twilio/token/${email}`)
      .catch((er) => {
        console.log("Unable to get Token", er);
      });
    const { data } = response;

    localStorage.setItem("twilio_token", data.token);
    const client = await Chat.Client.create(data.token);

    client.on("tokenAboutToExpire", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
      console.log("tokenAboutToExpire");
    });

    client.on("tokenExpired", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
      console.log("tokenExpired");
    });
  };

  render() {
    return (
      <React.Fragment>
        {getUserType === "user" ? (
          <div
            onClick={() => {
              this.getToken(localStorage.getItem("email"));
            }}
            style={{ cursor: "pointer" }}
            className="d-flex justify-content-end"
          >
            <i className="fa fa-comment p-2 bg-light" aria-hidden="true"></i>
          </div>
        ) : (
          <div style={{ display: "none" }}>Hello</div>
        )}
      </React.Fragment>
    );
  }
}

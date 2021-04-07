import React, { Component } from "react";
import axios from "axios";
import { ContactsOutlined } from "@material-ui/icons";
const getAccessToken = localStorage.getItem("token");
const Chat = require("twilio-chat");

export default class Chat_Icon extends Component {
  state = {
    myDetails: [],
  };
  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;
    axios.get("http://140.82.28.121:5500/usermanager/userinfo").then((res) => {
      this.setState({ myDetails: res.data });
      localStorage.setItem("email", res.data[0][3]);
    });
  }
  getToken = async (email) => {
    // console.log("Hello");
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;
    const response = await axios
      .get(`http://140.82.28.121:5500/twilio/token/${email}`)
      .catch((er) => {
        console.log("Unable to get Token", er);
      });
    const { data } = response;
    localStorage.setItem("twilio_Net_token", data.token);
  };

  render() {
    return (
      <React.Fragment>
        <div
          onClick={() => {
            this.getToken(localStorage.getItem("email"));
          }}
          style={{ cursor: "pointer" }}
          className="d-flex justify-content-end"
        >
          <i class="fa fa-comment p-2 bg-light" aria-hidden="true"></i>
        </div>
      </React.Fragment>
    );
  }
}

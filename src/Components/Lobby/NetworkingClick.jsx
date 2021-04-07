import React, { Component } from "react";
import axios from "axios";
const getAccessToken = localStorage.getItem("token");

export default class NetworkingClick extends Component {
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
        localStorage.setItem("twilio_networking_token", res.data.token);
      })
      .catch((er) => {
        console.log("Unable to get Token", er);
      });
  }
  render() {
    return <React.Fragment>NETWORKING</React.Fragment>;
  }
}

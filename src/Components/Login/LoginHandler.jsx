import React, { Component, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import Page from "react-page-loading";

function LoginHandler(props) {
  const search = useLocation().search;
  const userid = new URLSearchParams(search).get("userid");
  console.log("User ID is ", userid);

  useEffect(() => {
    let url = "http://140.82.28.121:5500/usermanager/getaccesstoken";
    let data = {
      token: userid,
    };
    let options = {
      method: "POST",
      data: qs.stringify(data),
      url,
    };
    axios(options)
      .then((res) => {
        console.log("DataComing", res.data);
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user_type", res.data.user_type);
        window.location.href = "/lobby";
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Page loader={"bubble-spin"} color={"#A9A9A9"} size={4} duration={5}>
        <h1 className="text-center">Loading...</h1>
      </Page>
    </div>
  );
}
export default LoginHandler;

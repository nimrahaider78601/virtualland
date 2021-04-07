import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import AboutUsContent from "./AboutUsContent";
const getUserType = localStorage.getItem("user_type");
const getAccessToken = localStorage.getItem("token");

function AboutUs(props) {
  const [aboutUs, setAboutUs] = useState("");
  const params = useParams();

  useEffect(() => {
    let url = "http://140.82.28.121:5500/api/booth/getinfo";
    let data = {
      boothId: params.id,
    };
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(data),
      url,
    };
    axios(options)
      .then((res) => {
        setAboutUs(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);

  return (
    <Router>
      <AboutUsContent text={aboutUs} id={params.id} />
    </Router>
  );
}

export default AboutUs;

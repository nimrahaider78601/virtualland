import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import EditVideoContent from "./EditVideoContent";

function EditVideo(props) {
  const [editVideo, setEditVideo] = useState("");
  const [checkStatus, setCheckStatus] = useState("");

  const params = useParams();

  const getAccessToken = localStorage.getItem("token");
  useEffect(() => {
    let url = "http://140.82.28.121:5500/api/booth/getallvideos";
    let data = {
      boothId: params.id,
    };
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
      data: qs.stringify(data),
      url,
    };
    axios(options)
      .then((res) => {
        setEditVideo(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
    // Status Check

    let urll = "http://140.82.28.121:5500/api/booth/getstatus";
    let dataz = {
      boothId: params.id,
    };
    let optionsz = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
      data: qs.stringify(dataz),
      url: urll,
    };
    axios(optionsz)
      .then((res) => {
        setCheckStatus(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);

  return (
    <Router>
      <EditVideoContent text={editVideo} id={params.id} status={checkStatus} />
    </Router>
  );
}

export default EditVideo;

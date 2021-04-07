import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import EditImagesContent from "./EditImagesContent";

function EditImages(props) {
  const [editBackgroundImage, setBackgroundImage] = useState("");
  const [editRightImage, setRightImage] = useState("");
  const [editLeftImage, setLeftImage] = useState("");

  const params = useParams();

  const getAccessToken = localStorage.getItem("token");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;

    // Background
    let url = "http://140.82.28.121:5500/api/booth/getbg";
    let data = {
      boothId: params.id,
    };
    let options = {
      method: "POST",
      data: qs.stringify(data),
      url,
    };
    axios(options)
      .then((res) => {
        setBackgroundImage(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
    // Right
    let right = "http://140.82.28.121:5500/api/booth/getrightimage";
    let rightData = {
      boothId: params.id,
    };
    let rightOptions = {
      method: "POST",
      data: qs.stringify(rightData),
      url: right,
    };
    axios(rightOptions)
      .then((res) => {
        setRightImage(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
    // Left
    let left = "http://140.82.28.121:5500/api/booth/getleftimage";
    let leftData = {
      boothId: params.id,
    };
    let leftOptions = {
      method: "POST",
      data: qs.stringify(leftData),
      url: left,
    };
    axios(leftOptions)
      .then((res) => {
        setLeftImage(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);

  return (
    <Router>
      <EditImagesContent
        background={editBackgroundImage}
        leftImg={editLeftImage}
        rightImg={editRightImage}
        id={params.id}
      />
    </Router>
  );
}

export default EditImages;

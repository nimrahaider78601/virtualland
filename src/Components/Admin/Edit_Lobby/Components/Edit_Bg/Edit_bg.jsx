import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import EditBgContent from "./EditBgContent";

function EditBackground(props) {
  const [editBackground, setEditBackground] = useState("");
  const params = useParams();

  const getAccessToken = localStorage.getItem("token");

  useEffect(() => {
    console.log(params.id);
    let url = "http://140.82.28.121:5500/api/lobby/getbackground";
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      url,
    };
    axios(options)
      .then((res) => {
        console.log(res.data);
        setEditBackground(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);

  return (
    <Router>
      <EditBgContent text={editBackground} id={params.id} />
    </Router>
  );
}

export default EditBackground;

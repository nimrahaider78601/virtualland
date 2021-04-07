import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import EditLogoContent from "./EditLogoContent";

function EditLogo(props) {
  const [editLogo, setEditLogo] = useState("");
  const params = useParams();

  const getAccessToken = localStorage.getItem("token");

  useEffect(() => {
    let url = "http://140.82.28.121:5500/api/booth/getlogo";
    let data = {
      boothId: params.id,
    };
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        // ...data.getHeaders(),

        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(data),
      url,
    };
    axios(options)
      .then((res) => {
        setEditLogo(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);

  return (
    <Router>
      <EditLogoContent text={editLogo} id={params.id} />
    </Router>
  );
}

export default EditLogo;

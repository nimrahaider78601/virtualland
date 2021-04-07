import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import EditDocumentContent from "./EditDocumentContent";

function EditDocument(props) {
  const [editContent, setEditContent] = useState("");
  const [checkStatus, setCheckStatus] = useState("");

  const params = useParams();

  useEffect(() => {
    let url = "http://140.82.28.121:5500/api/booth/getalldocuments";
    let data = {
      boothId: params.id,
    };

    const getAccessToken = localStorage.getItem("token");

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
        setEditContent(res.data);
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
      <EditDocumentContent
        text={editContent}
        id={params.id}
        status={checkStatus}
      />
    </Router>
  );
}

export default EditDocument;

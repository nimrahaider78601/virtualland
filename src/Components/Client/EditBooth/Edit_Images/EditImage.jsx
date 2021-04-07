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

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDY4OTc4NzgsIm5iZiI6MTYwNjg5Nzg3OCwianRpIjoiZjcwOWY1MTMtNGJkNi00OTZkLTk0OGYtZTEzNTZkZjVkYTBhIiwiaWRlbnRpdHkiOiJyYXNoaWRAZ21haWwuY29tfGNsaWVudCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkZW50aXR5IjoicmFzaGlkQGdtYWlsLmNvbXxjbGllbnQifX0.t_5Xq-caXwqyXhkz5H5CZaLgy67wyWCWjh7hUyObK0M`;

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

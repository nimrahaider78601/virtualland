import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import EditNameContent from "./EditNameContent";

function EditName(props) {
  const [EditName, setEditName] = useState("");
  const params = useParams();

  useEffect(() => {
    let url = "http://140.82.28.121:5500/api/booth/getname";
    let data = {
      boothId: params.id,
    };
    let options = {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDY4OTc4NzgsIm5iZiI6MTYwNjg5Nzg3OCwianRpIjoiZjcwOWY1MTMtNGJkNi00OTZkLTk0OGYtZTEzNTZkZjVkYTBhIiwiaWRlbnRpdHkiOiJyYXNoaWRAZ21haWwuY29tfGNsaWVudCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkZW50aXR5IjoicmFzaGlkQGdtYWlsLmNvbXxjbGllbnQifX0.t_5Xq-caXwqyXhkz5H5CZaLgy67wyWCWjh7hUyObK0M",
        // ...data.getHeaders(),

        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(data),
      url,
    };
    axios(options)
      .then((res) => {
        setEditName(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);

  return (
    <Router>
      <EditNameContent text={EditName} id={params.id} />
    </Router>
  );
}

export default EditName;

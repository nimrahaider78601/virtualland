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
    let options = {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDg3MTg0ODIsIm5iZiI6MTYwODcxODQ4MiwianRpIjoiMjg3OWY0MWYtNzFlYS00Zjc5LWJiNWUtZGU0NWZiZGRkYzMzIiwiaWRlbnRpdHkiOiJuaW1yYWhhaWRlcjc4NjBAZ21haWwuY29tfGFkbWluIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnsiaWRlbnRpdHkiOiJuaW1yYWhhaWRlcjc4NjBAZ21haWwuY29tfGFkbWluIn19.nvjqrbmGa80OF7bIfJsLmhxZoNo23ZiE2o201VPTYg0",
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
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDY4OTc4NzgsIm5iZiI6MTYwNjg5Nzg3OCwianRpIjoiZjcwOWY1MTMtNGJkNi00OTZkLTk0OGYtZTEzNTZkZjVkYTBhIiwiaWRlbnRpdHkiOiJyYXNoaWRAZ21haWwuY29tfGNsaWVudCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkZW50aXR5IjoicmFzaGlkQGdtYWlsLmNvbXxjbGllbnQifX0.t_5Xq-caXwqyXhkz5H5CZaLgy67wyWCWjh7hUyObK0M",
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

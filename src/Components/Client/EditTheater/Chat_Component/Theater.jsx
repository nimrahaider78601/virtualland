import React, { useState, useEffect } from "react";
import "./Chat_Component_Theater.css";
import Chat_Form from "./Chat_Form";
import { DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";
import Chat_Icon from "./Chat_Icon";

import { useParams } from "react-router-dom";
const getUserType = localStorage.getItem("user_type");

export default function Chat_Component() {
  const params = useParams();
  const [isOpened, setIsOpened] = useState(false);
  const [isNextOpened, setIsNextOpened] = useState(false);
  const [usersList, setUsersList] = useState("");
  const [userDetails, setUserDetails] = useState("");

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }
  function toggleNext() {
    setIsNextOpened(isOpened);
  }

  useEffect(() => {
    console.log("Hello", localStorage.getItem("user_type"));
    let url = "http://140.82.28.121:5500/usermanager/getusers";
    const getAccessToken = localStorage.getItem("token");
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
        setUsersList(res.data);
        console.log(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
    // Get Token
  }, []);
  return (
    <React.Fragment>
      <div className="chat_Component_Theater d-flex flex-column justify-content-end">
        {isOpened && (
          <Chat_Form
            theaterId={params.id}
            isOpened={isOpened}
            user={userDetails}
          />
        )}

        <div
          onClick={() => {
            toggle();
          }}
        >
          <Chat_Icon />
        </div>
      </div>
    </React.Fragment>
  );
}

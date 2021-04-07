import React, { useState, useEffect } from "react";
import "./Chat_Component_User.css";
import Chat_Form from "./Chat_Form";
import { DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";
import Chat_Icon from "./Chat_Icon";

import { useParams } from "react-router-dom";
import qs from "qs";
const getUserType = localStorage.getItem("user_type");
const getAccessToken = localStorage.getItem("token");

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
    let url = "http://140.82.28.121:5500/usermanager/booth/getclient";
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
        setUsersList(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
    // Get Token
  }, []);

  return (
    <React.Fragment>
      <div className="chat_Component d-flex flex-column justify-content-end">
        {isOpened && (
          <div className="rounded float-right">
            <div className="card" style={{ cursor: "default", width: "30rem" }}>
              <div className="card-header">
                {/* FLoat left */}
                <div className="float-left">
                  <span className="personal px-4 py-1 bg-light">Personal</span>
                  <span className="Invitados ml-3 px-4 py-1">Invitados</span>
                </div>
                {/* FLoat right */}
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Online"
                  className="online_span float-right"
                >
                  <Dropdown.Item href="#/action-1" className="shadow">
                    Name
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2" className="shadow">
                    Company
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              {/*Header End*/}
              {/* Body Start */}
              <div className="card-body bg-light">
                <div className="row text-left my-2">
                  <div className="col-6 name_col">
                    <span className="px-4 py-1">Name</span>
                  </div>
                  <div className="col-6 company_col">
                    <span className="px-4 py-1">Company</span>
                  </div>
                </div>
                <div className=" user_list">
                  {/* Row 1 */}
                  {getUserType === "user" ? (
                    <>
                      <div>
                        <>
                          <div className="pt-3 row text-left">
                            <div className="col-2">
                              <img
                                src="https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"
                                alt=""
                                className="rounded-circle"
                                height="30px"
                                width="30px"
                              />
                              <span className="logged-in text-danger">●</span>
                            </div>
                            <div
                              className="col-4 user_name"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setUserDetails(usersList);
                                toggleNext();
                              }}
                            >
                              <div>{usersList[1] + " " + usersList[2]}</div>
                            </div>
                            <div className="col-4">osmosis studio</div>
                            <div className="col-2">
                              <span className="empty px-2 py-0"> yr</span>
                            </div>
                          </div>

                          <hr style={{ backgroundColor: "#2beade" }} />
                        </>
                      </div>
                    </>
                  ) : (
                    " "
                  )}
                  {/* End */}
                </div>
              </div>
            </div>
          </div>
        )}
        {isNextOpened && (
          <Chat_Form
            boothId={params.id}
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

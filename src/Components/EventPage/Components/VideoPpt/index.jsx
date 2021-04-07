import React, { useState } from "react";
import "./VideoPpt.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import ReactPlayer from "react-player";
import PptDisplay from "./PptDisplay";
import MenuBar from "../../../MenuBar/MenuBar";
import Chat_event from "./Chat_event";

function VideoPpt() {
  const [mySlides, setMySlides] = useState("");
  const [editBackground, setEditBackground] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const getAccessToken = localStorage.getItem("token");

  const params = useParams();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;

    let url = "http://140.82.28.121:5500/api/theater/getppt";
    let data = {
      theaterId: params.id,
    };

    let options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url,
    };
    axios(options)
      .then((res) => {
        setMySlides(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });

    let url_bg = "http://140.82.28.121:5500/api/theater/getbg";
    let data_bg = {
      theaterId: params.id,
    };
    let options_bg = {
      method: "POST",
      data: qs.stringify(data_bg),
      url: url_bg,
    };
    axios(options_bg)
      .then((res) => {
        setEditBackground(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });

    axios
      .get("http://140.82.28.121:5500/usermanager/userinfo")
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);
  return (
    <React.Fragment>
      <div
        style={{
          background: `url("${
            editBackground == "Not Found"
              ? "https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1225&q=80"
              : editBackground
          }")`,
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          overflowX: "hidden",
        }}
        className="eventsbg"
      >
        <MenuBar />

        <div className="videoppt mt-5 row d-flex justify-content-center">
          {/* <Videocontent start */}
          <div className="video col-md-5 rounded bg-white ">
            <div className="video_heading d-flex align-items-center justify-content-center">
              <h3 className=" text-center py-2">Chat</h3>
            </div>
            <div style={{ height: "39vh" }}>
              <ReactPlayer
                className="player pt-3"
                url="https://youtu.be/o6KhogvhS2Y"
                controls={true}
                loop={true}
                width="100%"
                height="100%"
              />
            </div>
            <Chat_event userInfo={userInfo[0]} eventID={params.id} />
            {/* ///Form */}
          </div>
          {/* Video content end */}
          <div className="col-md-5 video ppt bg-white rounded">
            <div className="video_heading d-flex align-items-center justify-content-center">
              <h3 className="text-center py-2">Preguntas & Respuestas</h3>
            </div>
            {/* Ppt COntent start */}

            <PptDisplay text={mySlides} />
            <div>
              <div className="ml-4 py-2">
                <p className="m-0 d-flex align-items-center">
                  <span className="firstpara px-3 py-1">Chat</span>
                </p>
              </div>

              <div
                style={{
                  height: "25vh",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
                className="sidebardesign px-1"
              >
                <div className="py-3 px-4">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Libero quia provident ratione dolor sit.
                  </p>
                </div>
              </div>
              {/* //sidebaar */}
              {/* Form */}
              <div className="row form d-flex align-items-center">
                <div className="col-md-12">
                  <form action="">
                    <div className="input-group">
                      <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search accounts, contracts and transactions"
                        className="form-control rounded"
                      />
                      <button className="px-4 btn input-group-btn rounded text-lowercase">
                        enviar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Ppt content end */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default VideoPpt;

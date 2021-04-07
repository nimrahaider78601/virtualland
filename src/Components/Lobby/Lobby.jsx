import React, { useState } from "react";
import "./Lobby.css";
import img1 from "../../images/image-42.jpg";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenuBar from "../MenuBar/MenuBar";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./VerticalModal";
import { useEffect } from "react";
import axios from "axios";
import NetworkingClick from "./NetworkingClick";

function Lobby() {
  const [modalShow, setModalShow] = React.useState(false);
  const [editBackground, setEditBackground] = useState("");
  const getAccessToken = localStorage.getItem("token");
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;

    let url = "http://140.82.28.121:5500/api/lobby/getbackground";
    let options = {
      method: "GET",

      url,
    };
    axios(options)
      .then((res) => {
        setEditBackground(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);

  return (
    <React.Fragment>
      <div
        className="lobby"
        style={{
          background: `url("${editBackground}")`,
        }}
      >
        <MenuBar />

        <div className="lobbies">
          <div className="center_div">
            <summary
              className="loby_image"
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              <Image src={img1} alt="" />
            </summary>
          </div>

          {/* <!-- Modal --> */}
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          {/* ModalEnd */}

          <div className="btn-rectangle">
            <Link className="Booth_Btn" to="/booth">
              <button>STANDS</button>
            </Link>
            <Link className="Booth_Btn" to="/networking">
              <button>
                <NetworkingClick />
              </button>
            </Link>
            <Link className="Booth_Btn" to="/events">
              <button>EVENTS</button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Lobby;

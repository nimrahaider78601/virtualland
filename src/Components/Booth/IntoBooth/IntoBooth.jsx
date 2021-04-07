import React, { useState } from "react";
import "./IntoBooth.css";
import borderImg from "../../../images/border.png";
import { Row, Col, Button } from "react-bootstrap";
import AboutModal from "../../AbouModal/AboutModal";
import ContentModal from "../../ContentModal/ContentModal";
import DemoModal from "../../DemoModal/DemoModal";
import RightImg from "./Upperimages/RightImg";
import RightLogo from "./Upperimages/RightLogo";
import RightImgSibling from "./Upperimages/RightImgSibling";
import LeftImg from "./Upperimages/LeftImg";
import LeftLogo from "./Upperimages/LeftLogo";
import TopImg from "./Upperimages/TopImg";
import TopImgSibling from "./Upperimages/topImgSibling";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import ChatComponent from "./Chat_Component/Chat_Component";
import MenuBar from "../../MenuBar/MenuBar";
function IntoBooth() {
  const [AboutUs_Modal, setAboutUs_Modal] = useState(false);
  const [Content_Modal, setContent_Modal] = useState(false);
  const [Demo_Modal, setVideo_Modal] = useState(false);
  const [someText, setSomeText] = useState("");
  const [contentText, setContentText] = useState([]);
  const [leftImg, setLeftImg] = useState("");
  const [leftLogo, setLeftLogo] = useState("");
  const [rightImg, setRightImg] = useState("");
  const [rightLogo, setRightLogo] = useState("");
  const [rightSibling, setRightSibling] = useState("");
  const [topImg, setTopImg] = useState("");
  const [topSibling, setTopSibling] = useState("");
  const [checkStatus, setCheckStatus] = useState("");

  const params = useParams();
  useEffect(() => {
    let url = "http://140.82.28.121:5500/api/booth/getinfo";
    let data = {
      boothId: params.id,
    };
    let options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url,
    };
    axios(options)
      .then((res) => {
        setSomeText(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
    const ural = "http://140.82.28.121:5500/api/booth/getalldocuments";
    let content = {
      boothId: params.id,
    };
    let choice = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(content),
      url: ural,
    };
    axios(choice)
      .then((res) => {
        setContentText(res.data);
      })
      .catch((er) => {
        console.log("no content data found ", er);
      });
    let urll = "http://140.82.28.121:5500/api/booth/getleftimage";
    let contents = {
      boothId: params.id,
    };
    let choices = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(contents),
      url: urll,
    };
    axios(choices)
      .then((res) => {
        setLeftImg(res.data);
      })
      .catch((er) => {
        console.log("no content data found ", er);
      });

    let leftLogoUrl = "http://140.82.28.121:5500/api/booth/getrightimage";
    let contentLeftLogo = {
      boothId: params.id,
    };
    let choiceLeftLogo = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(contentLeftLogo),
      url: leftLogoUrl,
    };
    axios(choiceLeftLogo)
      .then((res) => {
        setLeftLogo(res.data);
      })
      .catch((er) => {
        console.log("no content data found ", er);
      });

    let urlll = "http://140.82.28.121:5500/api/booth/getrightimage";
    let contentx = {
      boothId: params.id,
    };
    let choicei = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(contentx),
      url: urlll,
    };
    axios(choicei)
      .then((res) => {
        setRightImg(res.data);
      })
      .catch((er) => {
        console.log("no content data found ", er);
      });

    let rightLogoUrl = "http://140.82.28.121:5500/api/booth/getrightimage";
    let contentRightLogo = {
      boothId: params.id,
    };
    let choiceRightLogo = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(contentRightLogo),
      url: rightLogoUrl,
    };
    axios(choiceRightLogo)
      .then((res) => {
        setRightLogo(res.data);
      })
      .catch((er) => {
        console.log("no content data found ", er);
      });

    let rightSiblingUrl =
      "http://140.82.28.121:5500/api/booth/getbottomleftimage";
    let contentRightSibling = {
      boothId: params.id,
    };
    let choiceRightSibling = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(contentRightSibling),
      url: rightSiblingUrl,
    };
    axios(choiceRightSibling)
      .then((res) => {
        setRightSibling(res.data);
      })
      .catch((er) => {
        console.log("no content data found ", er);
      });

    let topimg = "http://140.82.28.121:5500/api/booth/getlogo";
    let contenttop = {
      boothId: params.id,
    };
    let choicetop = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(contenttop),
      url: topimg,
    };
    axios(choicetop)
      .then((res) => {
        setTopImg(res.data);
      })
      .catch((er) => {
        console.log("no content data found ", er);
      });

    let topSiblingUrl =
      "http://140.82.28.121:5500/api/booth/getbottomrightimage";
    let contentTopSibling = {
      boothId: params.id,
    };
    let choiceTopSibling = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(contentTopSibling),
      url: topSiblingUrl,
    };
    axios(choiceTopSibling)
      .then((res) => {
        setTopSibling(res.data);
      })
      .catch((er) => {
        console.log("no content data found ", er);
      });

    // Check Status
    let urllstatus = "http://140.82.28.121:5500/api/booth/getstatus";
    let datazstatus = {
      boothId: params.id,
    };
    const getAccessToken = localStorage.getItem("token");

    let optionszstatus = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
      data: qs.stringify(datazstatus),
      url: urllstatus,
    };
    axios(optionszstatus)
      .then((res) => {
        setCheckStatus(res.data);
      })
      .catch((er) => {
        console.log("no data sorry ", er);
      });
  }, []);

  return (
    <div className="into-booth-container">
      <MenuBar />
      <ChatComponent />
      <AboutModal
        text={someText}
        show={AboutUs_Modal}
        onHide={() => setAboutUs_Modal(false)}
      />
      <ContentModal
        text={contentText}
        show={Content_Modal}
        onHide={() => setContent_Modal(false)}
      />
      <DemoModal show={Demo_Modal} onHide={() => setVideo_Modal(false)} />
      <div className="border-img" style={{ top: "10vh" }}></div>
      <div className="modal-btn-container">
        <Button
          className="m-1 modal-btn"
          block
          size="sm"
          onClick={() => setAboutUs_Modal(true)}
        >
          ABOUT US
        </Button>
        {checkStatus.Documents_Status === 0 ? (
          <Button
            style={{ display: "none" }}
            className="m-1 modal-btn"
            block
            size="sm"
            onClick={() => setContent_Modal(true)}
          >
            Content
          </Button>
        ) : (
          <Button
            className="m-1 modal-btn"
            block
            size="sm"
            onClick={() => setContent_Modal(true)}
          >
            Content
          </Button>
        )}
        {checkStatus.Videos_Status === 0 ? (
          <Button
            style={{ display: "none" }}
            className="m-1 modal-btn"
            block
            size="sm"
            onClick={() => setVideo_Modal(true)}
          >
            Demos
          </Button>
        ) : (
          <Button
            className="m-1 modal-btn"
            block
            size="sm"
            onClick={() => setVideo_Modal(true)}
          >
            Demos
          </Button>
        )}
      </div>
      <div className="row">
        <RightLogo text={rightLogo} />
        <RightImg text={rightImg} />
        <RightImgSibling text={rightSibling} />
        <LeftLogo text={leftLogo} />
        <LeftImg text={leftImg} />
      </div>
      <TopImg text={topImg} />
      <TopImgSibling text={topSibling} />
    </div>
  );
}
export default IntoBooth;

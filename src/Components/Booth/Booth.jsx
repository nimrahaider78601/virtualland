import React, { Component, useState } from "react";
import "./Booth.css";
import { Row, Col, Container, Button } from "react-bootstrap";
// import History from "react-router-dom"
import { Link } from "react-router-dom";
import axios from "axios";
import MenuBar from "./../MenuBar/MenuBar";
import NotFound from "../NotFound/NotFound";
const getAccessToken = localStorage.getItem("token");

export default class Booth extends Component {
  state = {
    booths: [],
    MainBoothBg: [],
  };
  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;

    axios.get("http://140.82.28.121:5500/api/getallbooths").then((res) => {
      this.setState({ booths: res.data });
    });

    axios
      .get("http://140.82.28.121:5500/api/mainbooth/getbackground")
      .then((res) => {
        this.setState({ MainBoothBg: res.data });
      });
  }
  // console.log(props.history);
  render() {
    const getUserType = localStorage.getItem("user_type");

    return (
      <React.Fragment>
        {getUserType === "user" ||
        getUserType === "admin" ||
        getUserType === "client" ? (
          <>
            <MenuBar />
            <div
              className="booth-container"
              style={{
                background: `url("${this.state.MainBoothBg}")`,
              }}
            >
              <div className="border-img">
                {/* <img src={borderImg} alt="" /> */}
              </div>
              <div className="booth-img-container ml-auto mr-auto">
                <Container fluid>
                  <Row>
                    {this.state.booths.map(function (item, i) {
                      return (
                        <Col lg={3} md={4} sm={4} key={i}>
                          <Link
                            className="text-decoration-none"
                            to={`/booth/IntoBooth/${item[0]}`}
                          >
                            <div className="img-text-container">
                              <div className="booth-img">
                                <div className="pol-1"></div>
                                <div className="pol-2"></div>
                                {item[3] ? (
                                  <img src={item[3]} alt="" />
                                ) : (
                                  <img
                                    src="http://140.82.28.121/data/booth/36/Black.png"
                                    alt=""
                                  />
                                )}
                              </div>
                              <p className="img-text text-center text-dark">
                                {item[1]}
                              </p>
                            </div>
                          </Link>
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </div>
            </div>
          </>
        ) : (
          <NotFound />
        )}
      </React.Fragment>
    );
  }
}

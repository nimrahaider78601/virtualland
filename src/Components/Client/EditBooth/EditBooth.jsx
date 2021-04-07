import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditName from "./Edit_Name/Edit_Name";
import AboutUs from "./About_Us/AboutUs";
import EditDocument from "./Edit_Document/EditDocument";
import EditVideo from "./Edit_Video/EditVideo";
import EditLogo from "./Edit_Logo/EditLogo";
import EditImage from "./Edit_Images/EditImage";
import AppBar from "../AppBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import "./Edit_Booth.css";
import NotFound from "../../NotFound/NotFound";
import Chat_Component from "./Chat_Component/index";

const routes = [
  {
    path: `/client/EditBooth/EditName/:id`,
    exact: true,
    main: (props) => {
      return <EditName text={props} />;
    },
  },
  {
    path: `/client/EditBooth/AboutUs/:id`,
    exact: true,
    main: (props) => {
      return <AboutUs text={props} />;
    },
  },
  {
    path: "/client/EditBooth/EditDocument/:id",
    exact: true,
    main: () => {
      return <EditDocument />;
    },
  },
  {
    path: "/client/EditBooth/EditVideo/:id",
    exact: true,
    main: () => {
      return <EditVideo />;
    },
  },
  {
    path: "/client/EditBooth/EditLogo/:id",
    exact: true,
    main: () => {
      return <EditLogo />;
    },
  },
  {
    path: "/client/EditBooth/EditImage/:id",
    exact: true,
    main: () => {
      return <EditImage />;
    },
  },
];

function EditBooth(props) {
  const getUserType = localStorage.getItem("user_type");
  console.log(getUserType);
  return (
    <React.Fragment>
      {getUserType === "client" ? (
        <>
          <div className="parent">
            <AppBar />
            <div className="d-flex bd-highlight justify-content-center border rounded">
              <h1 className="display-4">Edit Booth</h1>
            </div>
            <Router>
              {/* <div style={{ display: "flex" }}> */}
              <div className="row ">
                <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                  <div
                    className="scroll_x border-right justify-content-center"
                    style={{ overflowX: "auto" }}
                  >
                    <ul
                      className="list-group d-flex flex-row flex-md-column"
                      style={{ listStyleType: "none", padding: 0 }}
                    >
                      <li>
                        <Link
                          className="list-group-item list-group-item-action"
                          to={`/client/EditBooth/EditName/${props.match.params.id}`}
                        >
                          Edit Name
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="list-group-item list-group-item-action"
                          to={`/client/EditBooth/AboutUs/${props.match.params.id}`}
                        >
                          Edit About US
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="list-group-item list-group-item-action"
                          to={`/client/EditBooth/EditDocument/${props.match.params.id}`}
                        >
                          Edit Document
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="list-group-item list-group-item-action"
                          to={`/client/EditBooth/EditVideo/${props.match.params.id}`}
                        >
                          Edit Videos
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="list-group-item list-group-item-action"
                          to={`/client/EditBooth/EditLogo/${props.match.params.id}`}
                        >
                          Edit Logo
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="list-group-item list-group-item-action"
                          to={`/client/EditBooth/EditImage/${props.match.params.id}`}
                        >
                          Edit Images
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-10 col-md-8 col-lg-8 col-xl-8 ml-4 mr-4 mt-4">
                  <div className="">
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* </div> */}
            </Router>
            <Chat_Component />
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </React.Fragment>
  );
}

export default EditBooth;

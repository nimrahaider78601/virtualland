import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditInfo from "./Components/Edit_Bg/Edit_bg";
import EditVideo from "./Components/Edit_Video/Edit_Video";
import AppBar from "../AppBar";
import NotFound from "../../NotFound/NotFound";

const routes = [
  {
    path: `/admin/EditLobby/EditBg`,
    exact: true,
    main: (props) => {
      return <EditInfo text={props} />;
    },
  },
  {
    path: `/admin/EditLobby/EditVideo`,
    exact: true,
    main: (props) => {
      return <EditVideo text={props} />;
    },
  },
];

function EditLobby(props) {
  const getUserType = React.useState(localStorage.getItem("user_type") || "");
  return (
    <React.Fragment>
      {getUserType === "admin" ? (
        <>
          <div className="parent">
            <AppBar />
            <div className="d-flex bd-highlight justify-content-center border rounded">
              <h1 className="display-4">Edit Theater</h1>
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
                          to={`/admin/EditLobby/EditBg`}
                        >
                          Edit Background
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="list-group-item list-group-item-action"
                          to={`/admin/EditLobby/EditVideo`}
                        >
                          Edit Video
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
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </React.Fragment>
  );
}

export default EditLobby;

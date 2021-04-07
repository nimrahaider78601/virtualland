import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditInfo from "./Components/Edit_info";
import AppBar from "../AppBar";
import Edit_ppt from "./Components/Edit_ppt/Edit_ppt";
import NotFound from "../../NotFound/NotFound";
import Chat_Component from "./Chat_Component/Theater";

const routes = [
  {
    path: `/client/EditTheater/EditInfo/:id`,
    exact: true,
    main: (props) => {
      return <EditInfo text={props} />;
    },
  },
  {
    path: `/client/EditTheater/EditPpt/:id`,
    exact: true,
    main: (props) => {
      return <Edit_ppt text={props} />;
    },
  },
];

function EditTheater(props) {
  const getUserType = localStorage.getItem("user_type");
  return (
    <React.Fragment>
      {getUserType === "client" ? (
        <>
          <div className="parent">
            <AppBar style={{ zIndex: "-10000 !important" }} />
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
                          to={`/client/EditTheater/EditInfo/${props.match.params.id}`}
                        >
                          Edit Info
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="list-group-item list-group-item-action"
                          to={`/client/EditTheater/EditPpt/${props.match.params.id}`}
                        >
                          Edit Ppt
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

export default EditTheater;

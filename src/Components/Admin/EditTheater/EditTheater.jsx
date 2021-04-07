import React, { Component, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditInfo from "./Components/Edit_Background/Edit_bg";
import AppBar from "../AppBar";
import NotFound from "../../NotFound/NotFound";

const routes = [
  {
    path: `/admin/EditTheater/EditBg/:id`,
    exact: true,
    main: (props) => {
      return <EditInfo text={props} />;
    },
  },
];

function EditTheater(props) {
  const getUserType = localStorage.getItem("user_type");
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
                          to={`/admin/EditTheater/EditBg/${props.match.params.id}`}
                        >
                          Edit Background
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

export default EditTheater;

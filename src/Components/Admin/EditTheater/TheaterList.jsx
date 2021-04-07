import React, { Component, useState } from "react";

import { Link, Route } from "react-router-dom";
import axios from "axios";
// import Image from 'material-ui-image';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AppBar from "../AppBar";
import EditTheater from "./EditTheater.jsx";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import NotFound from "../../NotFound/NotFound";

const getAccessToken = localStorage.getItem("token");
export default class TheaterList extends Component {
  state = {
    allTheaters: [],
  };

  componentDidMount() {
    axios
      .get("http://140.82.28.121:5500/api/getalltheaters", {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        this.setState({ allTheaters: res.data });
      });
  }
  submitDelete = (id, name) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>
              You want to delete{" "}
              <span className="font-weight-bold text-warning">{name}</span>
            </p>
            <button className="btn btn-danger btn-sm mx-3" onClick={onClose}>
              No
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                this.deleteTheater(id);
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };
  deleteTheater = (id) => {
    const getAccessToken = localStorage.getItem("token");

    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;

    let delBody = new FormData();
    delBody.append("theaterId", id);
    console.log("There", id);
    axios
      .delete(`http://140.82.28.121:5500/api/admin/maintheater/removetheater`, {
        data: delBody,
      })

      .then((res) => {
        console.log(res);
        console.log("DeleteResData", res.data);

        const allTheaters = this.state.allTheaters.filter(
          (item) => item.id !== id
        );
        this.setState({ allTheaters: allTheaters });
        window.location = `/admin/TheaterList`;
      });
  };
  render() {
    const getUserType = localStorage.getItem("user_type");
    return (
      <React.Fragment>
        {getUserType === "admin" ? (
          <>
            <AppBar />
            <div
              style={{
                marginTop: "100px",
              }}
            >
              <Grid container>
                {this.state.allTheaters.map((item, i) => {
                  console.log(`${item[0]}`);
                  return (
                    <Grid
                      style={{
                        padding: "15px",
                      }}
                      key={i}
                      item
                      md={3}
                      sm={6}
                      xs={12}
                    >
                      <Card
                        style={{ minHeight: "200px", maxHeight: "max-content" }}
                        raised
                      >
                        <CardActionArea
                          style={{
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <CardContent>
                            <h5
                              style={{
                                letterSpacing: "1px",
                                textTransform: "none",
                              }}
                              className="my-2"
                            >
                              {item[1]}
                            </h5>
                            <p dangerouslySetInnerHTML={{ __html: item[2] }} />
                          </CardContent>
                        </CardActionArea>
                        <CardActions
                          disableSpacing
                          className="justify-content-center"
                        >
                          <IconButton>
                            <Link to={`/admin/EditTheater/EditBg/${item[0]}`}>
                              <EditIcon />
                            </Link>
                            {/* Delete Button */}
                          </IconButton>
                          <IconButton
                            onClick={(e) => {
                              this.submitDelete(item[0], item[1]);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </>
        ) : (
          <NotFound />
        )}
      </React.Fragment>
    );
  }
}

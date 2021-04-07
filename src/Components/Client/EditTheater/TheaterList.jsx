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
import "./EditTheater.css";

export default class TheaterList extends Component {
  state = {
    allTheaters: [],
  };

  componentDidMount() {
    axios
      .get("http://140.82.28.121:5500/api/getalltheaters", {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDY4OTc4NzgsIm5iZiI6MTYwNjg5Nzg3OCwianRpIjoiZjcwOWY1MTMtNGJkNi00OTZkLTk0OGYtZTEzNTZkZjVkYTBhIiwiaWRlbnRpdHkiOiJyYXNoaWRAZ21haWwuY29tfGNsaWVudCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkZW50aXR5IjoicmFzaGlkQGdtYWlsLmNvbXxjbGllbnQifX0.t_5Xq-caXwqyXhkz5H5CZaLgy67wyWCWjh7hUyObK0M",
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
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDY4OTc4NzgsIm5iZiI6MTYwNjg5Nzg3OCwianRpIjoiZjcwOWY1MTMtNGJkNi00OTZkLTk0OGYtZTEzNTZkZjVkYTBhIiwiaWRlbnRpdHkiOiJyYXNoaWRAZ21haWwuY29tfGNsaWVudCIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkZW50aXR5IjoicmFzaGlkQGdtYWlsLmNvbXxjbGllbnQifX0.t_5Xq-caXwqyXhkz5H5CZaLgy67wyWCWjh7hUyObK0M`;

    let delBody = new FormData();
    delBody.append("theaterId", id);
    console.log("There", id);
    axios
      .delete(
        `http://140.82.28.121:5500/api/client/maintheater/removetheater`,
        {
          data: delBody,
        }
      )

      .then((res) => {
        console.log(res);
        console.log("DeleteResData", res.data);

        const allTheaters = this.state.allTheaters.filter(
          (item) => item.id !== id
        );
        this.setState({ allTheaters: allTheaters });
        window.location = `/client/TheaterList`;
      });
  };
  render() {
    const getUserType = localStorage.getItem("user_type");
    return (
      <React.Fragment>
        {getUserType === "client" ? (
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
                      <Card style={{ height: "250px" }} raised>
                        <CardActionArea
                          style={{
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <CardContent className="EditTheaterScroll">
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
                          className=" justify-content-center"
                        >
                          <Link to={`/client/EditTheater/EditInfo/${item[0]}`}>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                          </Link>
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

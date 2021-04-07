import React, { Component } from "react";
import "./Login.css";
import Img1 from "./../../images/lobby-bg.jpg";
import { Link } from "react-router-dom";
import MenuBar from "../MenuBar/MenuBar";
import axios from "axios";

const getAccessToken = localStorage.getItem("token");

export default class Login extends Component {
  state = {
    name: "",
    SuccessMsg: [],
    errMsg: [],
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value, SuccessMsg: [], errMsg: [] });

    console.log("handleChange", e.target.value);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let loginBody = new FormData();
    loginBody.append("email_address", this.state.name);
    axios
      .post("http://140.82.28.121:5500/usermanager/login", loginBody)
      .then((res) => {
        console.log(res.data);
        this.setState({ SuccessMsg: res.data });
        e.target.reset();
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          console.log(e.response.data);
          this.setState({ errMsg: e.response.data });
        }
      });
  };
  render() {
    console.log("Helloooo", this.state.myDetails);
    return (
      <React.Fragment>
        <MenuBar />
        <div className="login" style={{ backgroundImage: `url(${Img1})` }}>
          <div className="container">
            <div className="row d-flex justify-content-center">
              {this.state.SuccessMsg.length === 0 ? (
                ""
              ) : (
                <div className="col-md-8 alert alert-success" role="alert">
                  <div className="text-center">
                    <h4>{this.state.SuccessMsg}</h4>
                    Please check your email.
                  </div>
                </div>
              )}
              {this.state.errMsg.length === 0 ? (
                ""
              ) : (
                <div className="col-md-8 alert alert-danger" role="alert">
                  <div className="text-center">
                    <h4>{this.state.errMsg}</h4>
                    Please register first.
                  </div>
                </div>
              )}
            </div>
            <div className="cards">
              <div className="card py-5 px-3 border rounded">
                <div className="">
                  <h5 className="text-center font-weight-bold">WELCOME</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-group form-group  border border-success rounded">
                      <div className="input-group-prepend ">
                        <span className="input-group-text">
                          <i
                            className="fa fa-envelope-o"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email_address"
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group text-center">
                      <button
                        type="submit"
                        value="Login"
                        className="btn btn-block btn-md rounded font-weight-bold login_btn"
                      >
                        LOGIN
                      </button>
                    </div>
                  </form>
                </div>
                <div className="d-flex justify-content-center links">
                  <Link className="text-decoration-none" to="/register">
                    <p className="text-white ">
                      Do not have an account?
                      <a href="#" className="font-weight-bold">
                        {" "}
                        Register
                      </a>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

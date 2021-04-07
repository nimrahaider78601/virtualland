import React, { Component } from "react";
import "./Register.css";
import Img1 from "./../../images/lobby-bg.jpg";
import { Link } from "react-router-dom";
import MenuBar from "../MenuBar/MenuBar";
import axios from "axios";
import { Form } from "react-bootstrap";

const getAccessToken = localStorage.getItem("token");
export default class Register extends Component {
  state = {
    input: {},
    SuccessMsg: [],
    ErrorMsg: [],
  };
  handleSubmit = (event) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;
    event.preventDefault();

    let reqBody = new FormData();
    console.log(this.state.input);

    reqBody.append("last_name", this.state.input.last_name);
    reqBody.append("company", this.state.input.company);
    reqBody.append("email_address", this.state.input.email_address);
    reqBody.append("level", this.state.input.level);
    reqBody.append("first_name", this.state.input.first_name);
    reqBody.append("phone", this.state.input.phone);
    reqBody.append("country", this.state.input.country);
    reqBody.append("department", this.state.input.department);
    reqBody.append("type", this.state.input.type);
    console.log("OurData", reqBody);

    axios
      .post("http://140.82.28.121:5500/usermanager/register", reqBody)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({ SuccessMsg: res.data });
        event.target.reset();
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          console.log(e.response.data);
          this.setState({ ErrorMsg: e.response.data });
        }
      });
  };
  handleChange = (event) => {
    event.preventDefault();
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
    console.log(event.target.value);
  };
  render() {
    return (
      <React.Fragment>
        <MenuBar />

        <div className="register" style={{ backgroundImage: `url(${Img1})` }}>
          <div className="container">
            <form onSubmit={this.handleSubmit}>
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
                {this.state.ErrorMsg.length === 0 ? (
                  ""
                ) : (
                  <div className="col-md-8 alert alert-danger" role="alert">
                    <div className="text-center">
                      <h4>{this.state.ErrorMsg}</h4>
                    </div>
                  </div>
                )}
              </div>
              <div className="cards row">
                <div className="col-md-4">
                  <div className="card px-3">
                    <div className="card-body">
                      <div className="input-group form-group  border rounded">
                        <div className="input-group-prepend ">
                          <span className="input-group-text">
                            <i className="fa fa-user" aria-hidden="true"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          placeholder="first_name"
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="input-group form-group border rounded">
                        <div className="input-group-prepend ">
                          <span className="input-group-text">
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          name="email_address"
                          placeholder="email_address"
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="input-group form-group border rounded">
                        <div className="input-group-prepend ">
                          <span className="input-group-text ">
                            <i
                              className="fa fa-envelope-o"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="company"
                          placeholder="company"
                          onChange={this.handleChange}
                          required
                        />
                      </div>

                      <div className="input-group form-group  border rounded">
                        <div className="input-group-prepend ">
                          <span className="input-group-text">
                            <i
                              className="fa fa-building"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>

                        <select
                          required
                          onChange={this.handleChange}
                          name="level"
                          class="form-control select_form"
                        >
                          <option
                            style={{ fontWeight: 100 }}
                            value=""
                            selected
                            disabled
                            hidden
                          >
                            select level
                          </option>
                          <option className="option_select">Staff</option>
                          <option className="option_select">Consultant</option>
                          <option className="option_select">Manager</option>
                          <option className="option_select">Director</option>
                          <option className="option_select">
                            VP/Executive
                          </option>
                          <option className="option_select">C-Level</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card px-3">
                    <div className="card-body">
                      <div className="input-group form-group  border rounded">
                        <div className="input-group-prepend ">
                          <span className="input-group-text">
                            <i className="fa fa-user" aria-hidden="true"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          placeholder="last_name"
                          onChange={this.handleChange}
                          required
                        />
                      </div>

                      <div className="input-group form-group border rounded">
                        <div className="input-group-prepend ">
                          <span className="input-group-text ">
                            <i
                              className="fa fa-envelope-o"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          name="phone"
                          placeholder="phone"
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="input-group form-group  border rounded">
                        <div className="input-group-prepend ">
                          <span className="input-group-text">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="country"
                          placeholder="country"
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="input-group form-group  border rounded">
                        <div className="input-group-prepend ">
                          <span className="input-group-text ">
                            <i
                              className="fa fa-address-card-o"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                        <select
                          required
                          onChange={this.handleChange}
                          name="department"
                          class="form-control select_form"
                        >
                          <option
                            style={{ fontWeight: 100 }}
                            value=""
                            selected
                            disabled
                            hidden
                          >
                            select department
                          </option>
                          <option className="option_select">
                            IT: Application/APP Owners
                          </option>
                          <option className="option_select">
                            IT: Architect
                          </option>
                          <option className="option_select">
                            IT: Data Center
                          </option>
                          <option className="option_select">
                            IT: Engineering
                          </option>
                          <option className="option_select">IT: General</option>
                          <option className="option_select">
                            IT: Network/Architecture/Infrastructure
                          </option>
                          <option className="option_select">
                            IT: Operation
                          </option>
                          <option className="option_select">
                            IT: Program/Project Manager
                          </option>
                          <option className="option_select">
                            IT: Security
                          </option>
                          <option className="option_select">Analyst</option>
                          <option className="option_select">
                            Content Production
                          </option>
                          <option className="option_select">Consultant</option>
                          <option className="option_select">
                            Digital/Internet Entertainment
                          </option>
                          <option className="option_select">Engineering</option>
                          <option className="option_select">Finance</option>
                          <option className="option_select">HR</option>
                          <option className="option_select">Legal</option>
                          <option className="option_select">Marketing</option>
                          <option className="option_select">Media</option>
                          <option className="option_select">Operations</option>
                          <option className="option_select">Press</option>
                          <option className="option_select">
                            Product Management
                          </option>
                          <option className="option_select">Production</option>
                          <option className="option_select">Sales</option>
                          <option className="option_select">Student</option>
                          <option className="option_select">Web</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-body col-md-8 px-5 pb-5">
                  <div className="mr-2 input-group form-group  border rounded">
                    <div className="input-group-prepend ">
                      <span className="input-group-text">
                        <i className="fa fa-building" aria-hidden="true"></i>
                      </span>
                    </div>

                    <select
                      required
                      onChange={this.handleChange}
                      name="type"
                      class="form-control select_form text-capitalize"
                    >
                      <option
                        style={{ fontWeight: 100 }}
                        value=""
                        selected
                        disabled
                        hidden
                      >
                        select user type
                      </option>
                      <option className="option_select text-capitalize">
                        user
                      </option>
                      <option className="option_select text-capitalize">
                        client
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group text-center">
                <button
                  type="submit"
                  className="btn  px-5 btn-md rounded login_btn"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="d-flex justify-content-center links">
              <Link className="text-decoration-none" to="/login">
                <p className="text-white ">
                  {" "}
                  Already have an account?
                  <a href="#" className="font-weight-bold">
                    {" "}
                    Login
                  </a>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

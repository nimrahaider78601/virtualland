import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../images/logo.png";
import "./MenuBar.css";
import { Link } from "react-router-dom";
import axios from "axios";

function MenuBar() {
  const getUserType = localStorage.getItem("user_type");

  return (
    <Navbar
      style={{ zIndex: "100" }}
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="main_nav py-2 px-2"
    >
      <>
        <Navbar.Brand href="#home">
          <Link to="/lobby">
            <img src={logo} alt="" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle className="bg-dark" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="bg-dark text-center" id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home" className="text-light li-item">
              <Link to="/lobby" className="text-decoration-none text-white">
                LOBBY
              </Link>
            </Nav.Link>
            <Nav.Link href="#link" className="text-light li-item">
              EXPERIENCES
            </Nav.Link>
            <Nav.Link href="#link" className="text-light li-item">
              EVENTS
            </Nav.Link>
            <Nav.Link href="#link" className="text-light li-item">
              <Link to="/register" className="text-decoration-none text-white">
                NETWORKING
              </Link>
            </Nav.Link>
            <Nav.Link href="#link" className="text-light li-item">
              <Link to="/login" className="text-decoration-none text-white">
                REGISTRARSE
              </Link>
            </Nav.Link>
            <Nav.Link href="#link" className="text-light li-item">
              <Link to="/admin" className="text-decoration-none text-white">
                INICIAR SESION
              </Link>
            </Nav.Link>
            {getUserType ? (
              <Nav.Link
                href="#link"
                className="text-decoration-none text-white text-light li-item"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </>
    </Navbar>
  );
}
const getAccessToken = localStorage.getItem("token");
const handleLogout = () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getAccessToken}`;
  axios.delete("http://140.82.28.121:5500/usermanager/logout").then((res) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    console.log(res.data);
    window.location = "/login"; //This line of code will redirect you once the submission is succeed
  });
};

export default MenuBar;

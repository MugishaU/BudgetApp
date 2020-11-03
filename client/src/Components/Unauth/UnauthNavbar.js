import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

export default function UnauthNavbar() {
  return (
    <Navbar bg="light" fixed="top">
      <Navbar.Text>BDGT</Navbar.Text>
      <NavLink className="nav-link" to="/">
        Login
      </NavLink>
      <NavLink className="nav-link" to="/register">
        Register
      </NavLink>
    </Navbar>
  );
}

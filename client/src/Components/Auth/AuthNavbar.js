import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import * as firebase from "firebase";
import Navbar from "react-bootstrap/Navbar";

export default withRouter(function AuthNavbar(props) {
  const logout = () => {
    firebase.app().auth().signOut();
    props.history.push("/");
  };
  return (
    <Navbar bg="light">
      <Navbar.Text>BDGT</Navbar.Text>
      <NavLink className="nav-link" to="/">
        Dashboard
      </NavLink>
      <NavLink className="nav-link" to="/profile">
        Profile
      </NavLink>
      <NavLink className="nav-link" to="/history">
        History
      </NavLink>
      <span onClick={logout}>Logout</span>
    </Navbar>
  );
});

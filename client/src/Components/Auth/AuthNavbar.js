import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import * as firebase from "firebase";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default withRouter(function AuthNavbar(props) {
  const logout = () => {
    firebase.app().auth().signOut();
    props.history.push("/");
  };
  return (
    <Navbar bg="light">
      <Navbar.Text className="logo">BDGT</Navbar.Text>
      <NavLink className="nav-link" to="/">
        Dashboard
      </NavLink>
      <NavLink className="nav-link" to="/profile">
        Profile
      </NavLink>
      <NavLink className="nav-link" to="/history">
        History
      </NavLink>
      <Button onClick={logout} variant="outline-secondary" size="l">
        Logout
      </Button>
    </Navbar>
  );
});

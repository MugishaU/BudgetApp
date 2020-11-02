import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import * as firebase from "firebase";

export default withRouter(function AuthNavbar(props) {
  const logout = () => {
    firebase.app().auth().signOut();
    props.history.push("/");
  };
  return (
    <nav>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/history">History</NavLink>
      <span onClick={logout}>Logout</span>
    </nav>
  );
});

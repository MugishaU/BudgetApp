import React from "react";
import { NavLink } from "react-router-dom";
import * as firebase from "firebase";

const logout = () => {
  firebase.app().auth().signOut();
};

export default function AuthNavbar() {
  return (
    <nav>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/history">History</NavLink>
      <span onClick={logout}>Logout</span>
    </nav>
  );
}

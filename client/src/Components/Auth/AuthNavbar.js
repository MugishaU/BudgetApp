import React from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

export default function AuthNavbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/">Profile</Link>
      <Link to="/">History</Link>
      <Link to="/" onClick={firebase.app().auth().signOut()}>
        Logout
      </Link>
    </nav>
  );
}

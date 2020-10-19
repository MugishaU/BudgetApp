import React from "react";
import { Link } from "react-router-dom";

export default function UnauthNavbar() {
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}

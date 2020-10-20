import React from "react";
import { NavLink } from "react-router-dom";

export default function UnauthNavbar() {
  return (
    <nav>
      <NavLink to="/">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
}

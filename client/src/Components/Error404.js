import React from "react";
import { NavLink, withRouter } from "react-router-dom";

export default withRouter(function Error404(props) {
  return (
    <div style={{ margin: "auto" }}>
      <h2>Oops!</h2>
      <h4>We don't have a page called "{props.location.pathname.slice(1)}"</h4>
      <NavLink to="/">Rescue Me</NavLink>
    </div>
  );
});

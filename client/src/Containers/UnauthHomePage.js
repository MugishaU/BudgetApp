import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  UnauthNavbar,
  LoginForm,
  RegisterForm,
} from "../Components/index/index";
import Error404 from "../Components/Error404";

export default function UnauthHomePage() {
  return (
    <>
      <UnauthNavbar />

      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route component={Error404} />
      </Switch>
    </>
  );
}

import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  UnauthNavbar,
  LoginForm,
  RegisterForm,
} from "../Components/index/index";

export default function UnauthHomePage() {
  return (
    <>
      <UnauthNavbar />

      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
      </Switch>
    </>
  );
}

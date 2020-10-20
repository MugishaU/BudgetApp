import React from "react";
import * as firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { UnauthHomePage, AuthHomePage } from "./Containers/index/index";
import "./styles/App.css";

export default function App() {
  const [user] = useAuthState(firebase.auth());

  if (user) {
    return <AuthHomePage />;
  }
  return <UnauthHomePage />;
}

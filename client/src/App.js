import React from "react";
import * as firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { UnauthHomePage, AuthHomePage } from "./Containers/index/index";
import "./styles/App.css";
import { AuthNavbar } from "./Components/index";

const login = () =>
  firebase
    .auth()
    .signInWithEmailAndPassword("user1@user.com", "test123")
    .catch(function (error) {
      alert(error.message);
    });
const logout = () => firebase.app().auth().signOut();
const token = () =>
  firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function (idToken) {
      console.log(idToken);
    })
    .catch(function (error) {
      console.log(error);
    });

export default function App() {
  const [user] = useAuthState(firebase.auth());

  if (user) {
    return <AuthHomePage />;
  }
  return <UnauthHomePage />;
}

import React from "react";
import * as firebase from "firebase";
import { AuthNavbar } from "../Components/index/index";

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

export default function AuthHomePage() {
  return (
    <>
      <AuthNavbar />
      <h1>You're Logged In 🎉</h1>
      <h3>Email: {firebase.auth().currentUser.email}</h3>
      <button onClick={token}>Get Token</button>
    </>
  );
}

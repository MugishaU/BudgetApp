import React from "react";
import * as firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { UnauthNavbar, LoginForm } from "./Components/index/index";
import "./styles/App.css";

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
    return (
      <>
        <h1>You're Logged In 🎉</h1>
        <h3>Email: {firebase.auth().currentUser.email}</h3>
        <button onClick={logout}>Logout</button>
        <button onClick={token}>Get Token</button>
      </>
    );
  }
  return (
    <>
      <UnauthNavbar />
      <LoginForm />
      {/* <h1>Sign In</h1> */}
      {/* <button onClick={login}>Login</button> */}
    </>
  );
}

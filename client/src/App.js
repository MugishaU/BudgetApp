import React from "react";
import * as firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./styles/App.css";

export default function App() {
  const [user] = useAuthState(firebase.auth());

  if (user) {
    return (
      <>
        <h1>You're Logged In 🎉</h1>
        <h3>Email: {firebase.auth().currentUser.email}</h3>
        <button
          onClick={() => {
            firebase.app().auth().signOut();
          }}
        >
          Logout
        </button>
        <button
          onClick={() => {
            firebase
              .auth()
              .currentUser.getIdToken(/* forceRefresh */ true)
              .then(function (idToken) {
                console.log(idToken);
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          Get Token
        </button>
      </>
    );
  }
  return (
    <>
      <h1>Sign In</h1>
      <button
        onClick={() => {
          firebase
            .auth()
            .signInWithEmailAndPassword("user1@user.com", "test123")
            .catch(function (error) {
              alert(error.message);
            });
        }}
      >
        Login
      </button>
    </>
  );
}

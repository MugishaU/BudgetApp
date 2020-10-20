import React, { useContext, useEffect } from "react";
import * as firebase from "firebase";
import { AuthNavbar } from "../Components/index/index";
import { UserContext } from "../Context/userContext ";

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

const token2 = () => {
  console.log(firebase.auth().currentUser.getIdToken(true));
};

export default function AuthHomePage() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: idToken,
          },
        };

        fetch(`https://budgt-app.herokuapp.com/user`, options)
          .then((result) => result.json())
          .then((data) => {
            setUser(data);
          })
          .catch((error) => console.log(error));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <AuthNavbar />
      <h1>You're Logged In 🎉</h1>
      {user && <h1>{user.username}</h1>}
      <h3>Email: {firebase.auth().currentUser.email}</h3>
      <button onClick={token2}>Get Token</button>
    </>
  );
}

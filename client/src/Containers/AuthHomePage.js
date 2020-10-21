import React, { useContext, useEffect } from "react";
import * as firebase from "firebase";
import { AuthNavbar } from "../Components/index/index";
import { UserContext } from "../Context/userContext ";

const getToken = () => {
  console.log(firebase.auth().currentUser.getIdToken(true));
};

export default function AuthHomePage() {
  const { profile, setProfile, setHistory, token } = useContext(UserContext);

  useEffect(() => {
    let today = new Date();
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };
    if (token) {
      fetch(`https://budgt-app.herokuapp.com/user`, options)
        .then((result) => result.json())
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => console.log(error));

      fetch(
        `https://budgt-app.herokuapp.com/history?month=${
          today.getMonth() + 1
        }&year=${today.getFullYear()}`,
        options
      )
        .then((result) => result.json())
        .then((data) => {
          setHistory(data);
        })
        .catch((error) => console.log(error));
    }
  }, [token]);
  return (
    <>
      <AuthNavbar />
      <h1>You're Logged In 🎉</h1>
      {profile && <h1>{profile.username}</h1>}
      <h3>Email: {firebase.auth().currentUser.email}</h3>
      <button onClick={getToken}>Get Token</button>
    </>
  );
}
